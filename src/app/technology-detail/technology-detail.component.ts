import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Technology } from '../technology';
import { TechnologyService } from '../technology.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-technology-detail',
  templateUrl: './technology-detail.component.html',
  styleUrls: ['./technology-detail.component.css']
})
export class TechnologyDetailComponent implements OnInit {

  @Input() tech?: Technology;

  constructor(
	private route: ActivatedRoute,
	private techService: TechnologyService,
	private location: Location, 
	private messageService: MessageService) { }

    ngOnInit(): void {
  	    this.getTech();
    }

    getTech(): void {
	    const id = Number(this.route.snapshot.paramMap.get('id'));
	    if (id != 0 && !isNaN(id)) {
		    this.techService.getTech(id)
		    .subscribe(tech => {
		    	if (tech.status == "ok") {
			        this.tech = tech.data;
			    }
		    });
	    }
	}
  
    goBack(): void {
	    this.location.back();  
    }

    update(): void {
        if (this.tech) {
            this.techService.updateTech(this.tech)
            .subscribe(() => {
            	this.messageService.add("update project successful");
            	this.goBack()
            });
        }
    }
}
