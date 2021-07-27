import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
declare var $: any;


@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    states: { name: string, abr: string }[] = [
        {
            "name": "Chose your state",
            "abr": "Chose your state"
        },
        {
            "name": "Alabama",
            "abr": "AL"
        },
        {
            "name": "Alaska",
            "abr": "AK"
        },
        {
            "name": "American Samoa",
            "abr": "AS"
        },
        {
            "name": "Arizona",
            "abr": "AZ"
        },
        {
            "name": "Arkansas",
            "abr": "AR"
        },
        {
            "name": "California",
            "abr": "CA"
        },
        {
            "name": "Colorado",
            "abr": "CO"
        },
        {
            "name": "Connecticut",
            "abr": "CT"
        },
        {
            "name": "Delaware",
            "abr": "DE"
        },
        {
            "name": "District Of Columbia",
            "abr": "DC"
        },
        
        {
            "name": "Florida",
            "abr": "FL"
        },
        {
            "name": "Georgia",
            "abr": "GA"
        },
        {
            "name": "Guam",
            "abr": "GU"
        },
        {
            "name": "Hawaii",
            "abr": "HI"
        },
        {
            "name": "Idaho",
            "abr": "ID"
        },
        {
            "name": "Illinois",
            "abr": "IL"
        },
        {
            "name": "Indiana",
            "abr": "IN"
        },
        {
            "name": "Iowa",
            "abr": "IA"
        },
        {
            "name": "Kansas",
            "abr": "KS"
        },
        {
            "name": "Kentucky",
            "abr": "KY"
        },
        {
            "name": "Louisiana",
            "abr": "LA"
        },
        {
            "name": "Maine",
            "abr": "ME"
        },
        {
            "name": "Maryland",
            "abr": "MD"
        },
        {
            "name": "Massachusetts",
            "abr": "MA"
        },
        {
            "name": "Michigan",
            "abr": "MI"
        },
        {
            "name": "Minnesota",
            "abr": "MN"
        },
        {
            "name": "Mississippi",
            "abr": "MS"
        },
        {
            "name": "Missouri",
            "abr": "MO"
        },
        {
            "name": "Montana",
            "abr": "MT"
        },
        {
            "name": "Nebraska",
            "abr": "NE"
        },
        {
            "name": "Nevada",
            "abr": "NV"
        },
        {
            "name": "New Hampshire",
            "abr": "NH"
        },
        {
            "name": "New Jersey",
            "abr": "NJ"
        },
        {
            "name": "New Mexico",
            "abr": "NM"
        },
        {
            "name": "New York",
            "abr": "NY"
        },
        {
            "name": "North Carolina",
            "abr": "NC"
        },
        {
            "name": "North Dakota",
            "abr": "ND"
        },
        {
            "name": "Northern Mariana Islands",
            "abr": "MP"
        },
        {
            "name": "Ohio",
            "abr": "OH"
        },
        {
            "name": "Oklahoma",
            "abr": "OK"
        },
        {
            "name": "Oregon",
            "abr": "OR"
        },
        
        {
            "name": "Pennsylvania",
            "abr": "PA"
        },
        {
            "name": "Puerto Rico",
            "abr": "PR"
        },
        {
            "name": "Rhode Island",
            "abr": "RI"
        },
        {
            "name": "South Carolina",
            "abr": "SC"
        },
        {
            "name": "South Dakota",
            "abr": "SD"
        },
        {
            "name": "Tennessee",
            "abr": "TN"
        },
        {
            "name": "Texas",
            "abr": "TX"
        },
        {
            "name": "Utah",
            "abr": "UT"
        },
        {
            "name": "Vermont",
            "abr": "VT"
        },
        {
            "name": "Virgin Islands",
            "abr": "VI"
        },
        {
            "name": "Virginia",
            "abr": "VA"
        },
        {
            "name": "Washington",
            "abr": "WA"
        },
        {
            "name": "West Virginia",
            "abr": "WV"
        },
        {
            "name": "Wisconsin",
            "abr": "WI"
        },
        {
            "name": "Wyoming",
            "abr": "WY"
        }
        ]
    data = [];
    result;
    focus;
    focus1;
    focus2;
    test: Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    loginForm: FormGroup;
    constructor(
        private _http: HttpClient,
        private fb: FormBuilder,
        private _router: Router,
        private element: ElementRef
    ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        let data
        let url = "https://theunitedstates.io/congress-legislators/legislators-current.json";
        this._http.get(url).subscribe(
            result => {
                data = result
                this.data = data; 
                console.log(this.data);
            }
        );
        this.checkFullPageBackgroundImage();
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    search(val) {
        this.result = [];
        for(let i = 0; i<this.data.length; i++) {
            if (this.data[i].terms[0].state === val) {
                this.result.push(this.data[i])
            }
        }
        console.log(this.result)
    };
    
  
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
    }

    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    

}
