import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';

import { Developer } from '../developer';
import { DeveloperService } from '../developer.service';

@Component({
  selector: 'app-developer-detail',
  templateUrl: './developer-detail.component.html',
  styleUrls: ['./developer-detail.component.css']
})
export class DeveloperDetailComponent implements OnInit {
	@Input() dev?: Developer;

    constructor(
    	private route: ActivatedRoute,
		private devService: DeveloperService,
		private location: Location, 
		private messageService: MessageService) { }

    ngOnInit(): void {
    	this.getDev();
    }

    getDev(): void {
	    const id = Number(this.route.snapshot.paramMap.get('id'));
	    if (id != 0 && !isNaN(id)) {
		    this.devService.getDev(id)
		    .subscribe(dev => {
		    	if (dev.status == "ok") {
			        this.dev = dev.data;
			    }
		    });
	    }
	}

    goBack(): void {
	    this.location.back();  
    }

    update(): void {
        if (this.dev) {
            this.devService.updateDev(this.dev)
            .subscribe(() => {
            	this.messageService.add("update developer successful");
            	this.goBack()
            });
        }
    }

}
