import { Component, OnInit, ViewChild } from '@angular/core';
import { LookupsService } from '../../lookups.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

interface Users {
  docId: string;
  email: string;
  lookups: number;
  archive?: boolean;
  adminType?: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  columnsToDisplay = ['index', 'email', 'lookups', 'archive'];
  loading = false;

  usersList!: Users[];

  dataSource = new MatTableDataSource(this.usersList);

  @ViewChild(MatSort) sort!: MatSort;

  usersAndLookups: any;
  noOfLookups!: number;
  currentEmail!: string;
  currentLookup!: number;
  currentUser!: string;
  showChanger = false;
  archivedLookups: Array<Users> = [];
  showArchive = false;
  isSuperAdmin = false;
  showRecent = false;
  recentLookups: any;
  adminType: any;
  adminList: Array<Users> = [];
  editingAdmin = false;

  constructor(private lookupService: LookupsService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('dataBinderUser');

    if (
      !(
        currentUser === 'D3YWgjH9DndDEtvBYryE1wlvrHh2' ||
        currentUser === '63Dgz3W8SAW1ibwiOvqCXjpOJLX2'
      )
    ) {
      this.router.navigate(['']);
    }

    this.isSuperAdmin = currentUser === '63Dgz3W8SAW1ibwiOvqCXjpOJLX2';
    this.getLookups();
    this.getRecent();

    this.lookupService.getLookups().subscribe((look) => {
      this.adminType = look?.adminType;
    });
  }

  getRecent(): void {
    this.lookupService.getAllRecentUpdates().subscribe((recent) => {
      this.recentLookups = recent;
    });
  }

  getLookups(): void {
    this.usersAndLookups = this.lookupService
      .getAllUsersLookups()
      .subscribe((lookups) => {
        this.usersAndLookups = lookups;
        const allLookups = lookups.map((lookup, index) => {
          return {
            docId: lookup.docId,
            email: lookup.email,
            lookups: lookup.lookups,
            archive: lookup?.archive,
            adminType: lookup?.adminType,
          } as Users;
        });
        this.usersList = allLookups.filter((data) => !data.archive);
        this.archivedLookups = allLookups.filter((data) => data.archive);
        this.adminList = allLookups.filter((data) => data.adminType);

        this.dataSource = new MatTableDataSource(this.usersList);
        this.dataSource.sort = this.sort;
      });
  }

  setCurrentEmail(email: string, lookups: number, user: string): void {
    this.currentEmail = email;
    this.currentLookup = lookups;
    this.currentUser = user;
  }

  updateLookups(lookup: any): void {
    this.loading = true;
    if (this.adminType.toLowerCase() === 'super') {
      // tslint:disable-next-line:radix
      lookup = parseInt(lookup);
      this.lookupService.setLookups(lookup, this.currentUser).then(() => {
        this.currentEmail = '';
        this.loading = false;
      });
    }
  }

  search(searchText: string): void {
    this.dataSource = new MatTableDataSource(
      this.usersList.filter((user) =>
        user.email.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }

  archiveEmail(docId: any): void {
    this.lookupService.archiveLookup(docId, true).then(() => {});
  }

  removeFromArchive(docId: string): void {
    this.lookupService.archiveLookup(docId, false).then(() => {});
  }

  seenRecent(docId: any): void {
    this.lookupService.deleteRecent(docId).then();
  }
}
