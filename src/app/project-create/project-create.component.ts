import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from '../message.service';

import { Developer } from '../developer';
import { DeveloperService } from '../developer.service';
import { TechnologyService } from '../technology.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

	devs: any = []
	techs: any = []
	isSubmitted = false;

  	constructor(
  		private route: ActivatedRoute,
		private devService: DeveloperService,
		private proService: ProjectService,
		private techService: TechnologyService,
		private location: Location,
		public formBuilder: FormBuilder, 
		private messageService: MessageService) { }

	projectForm = this.formBuilder.group({
	    name: ['', Validators.required],
	    description: ['', Validators.required],
	    start_date: ['', Validators.required],
	    end_date: '',
	    developer_ids: [],
	    technology_ids: []
	});

    ngOnInit(): void {
    	this.getDevs();
    	this.getTechs();
    }

    get developerID() {
	    return this.projectForm.get('developer_ids');
	}

	get technologyID() {
	    return this.projectForm.get('technology_ids');
	}

    changeDeveloper(e: any) {
    	if (this.developerID == null) {
    		return
    	}

	    this.developerID.setValue(e.target.value, {
	      onlySelf: true
	    })
	}

	changeTechnology(e: any) {
    	if (this.technologyID == null) {
    		return
    	}

	    this.technologyID.setValue(e.target.value, {
	      onlySelf: true
	    })
	}

    getDevs(): void {
        this.devService.getDevs().subscribe(devs => {
            if (devs.status == "ok") {
                this.devs = devs.data;
            }
        });
    }

    getTechs(): void {
        this.techService.getTechs().subscribe(techs => {
            if (techs.status == "ok") {
                this.techs = techs.data;
            }
        });
    }

    get projectFormControl() {
    	return this.projectForm.controls;
  	}

    onSubmit() {
		this.isSubmitted = true;
		if (this.projectForm.dirty && this.projectForm.valid) {
			this.proService.addPro(this.projectForm.value)
		    	.subscribe(() => {
		    		this.messageService.add("Add project successful");
		    		this.location.back()
		    	}
		    );
		}
	}

}
