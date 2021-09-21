import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from "@angular/forms";

import { Developer } from '../developer';
import { DeveloperService } from '../developer.service';
import { ProjectService } from '../project.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-developer-create',
  templateUrl: './developer-create.component.html',
  styleUrls: ['./developer-create.component.css']
})

export class DeveloperCreateComponent implements OnInit {

	projects: any = []

	isSubmitted = false;

    constructor(
    	private route: ActivatedRoute,
		private devService: DeveloperService,
		private proService: ProjectService,
		private location: Location,
		public formBuilder: FormBuilder, 
		private messageService: MessageService) { }

	developerForm = this.formBuilder.group({
	    firstname: ["", [Validators.required]],
	    lastname: ["", [Validators.required]],
	    project_ids: ["", [Validators.required]]
	});

    @Input() devs?: any;

    ngOnInit(): void {
    	this.getPros();
    }

    get projectID() {
	    return this.developerForm.get('project_ids');
	}

    changeProject(e: any) {
    	if (this.projectID == null) {
    		return
    	}

	    this.projectID.setValue(e.target.value, {
	      onlySelf: true
	    })
	}

	getPros(): void {
    	this.proService.getPros().subscribe(projects => {
            if (projects.status == "ok") {
                this.projects = projects.data;
            }
        });
    }

    get developerFormControl() {
    	return this.developerForm.controls;
  	}

	onSubmit() {
		this.isSubmitted = true;
		if (this.developerForm.dirty && this.developerForm.valid) {
			this.devService.addDev(this.developerForm.value)
		    	.subscribe(() => {
		    		this.messageService.add("Add developer successful");
		    		this.location.back()
		    	}
		    );
		}
	}

}
