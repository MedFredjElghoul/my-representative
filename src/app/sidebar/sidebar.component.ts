import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    collapse?: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/home',
        title: 'Accueil',
        type: 'link',
        icontype: 'nc-icon nc-align-center'
    },
    {
        path: '/hebergement',
        title: 'Hébergement',
        type: 'link',
        icontype: 'nc-icon nc-bank'
    },
    {
        path: '/golf',
        title: 'Golf',
        type: 'link',
        icontype: 'nc-icon nc-sun-fog-29'
    },
    {
        path: '/gallery',
        title: 'Gallerie',
        type: 'sub',
        icontype: 'nc-icon nc-album-2',
        collapse: 'gallery',
        children: [
            {
                path: 'chambers', title: 'Chambres', ab: 'CH'
            },
            {
                path: 'salles', title: 'Salles', ab: 'SA'
            },
            {
                path: 'divers', title: 'Divers', ab: 'DI'
            },
            {
                path: 'spa', title: 'Spa', ab: 'S'
            }
        ]
    },
    {
        path: '/covid',
        title: 'Covid',
        type: 'link',
        icontype: 'nc-icon nc-bulb-63'
    },
    {
        path: '/reservation',
        title: 'Reservation',
        type: 'link',
        icontype: 'nc-icon nc-check-2'
    },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    public menuItems: any[];
    isNotMobileMenu(){
        if( window.outerWidth > 991){
            return false;
        }
        return true;
    }
    
    myName;
    adminAccess: boolean = false;
    constructor(
        private _router: Router
    ) { }
    ngOnInit() {
        let verifyAdmin;
        verifyAdmin = localStorage.getItem('ROLE');
        if (verifyAdmin === "1") {
            this.adminAccess = true;
        }
        this.myName = JSON.parse(localStorage.getItem("ME")).full_name;
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    
    ngAfterViewInit(){
    }
    
    logout() {
        localStorage.clear();
        this._router.navigateByUrl('login');
    }
}
