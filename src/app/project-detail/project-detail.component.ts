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
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

    devs: any = []
	techs: any = []
	isSubmitted = false;
	@Input() project?: any;

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
    	this.getPro();
    	this.getDevs();
    	this.getTechs();
    }

    get name() {
    	return this.projectForm.get('developer_ids');
    }

    get developerID() {
	    return this.projectForm.get('developer_ids');
	}

	get technologyID() {
	    return this.projectForm.get('technology_ids');
	}

	get startDate() {
		return this.projectForm.get('start_date');
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

    getPro(): void {
	    const id = Number(this.route.snapshot.paramMap.get('id'));
	    this.proService.getPro(id)
		    .subscribe(project => {
		    	if (project.status == "ok") {
			        this.project = project.data;
			        console.log(project);
			        this.projectForm = this.formBuilder.group({
			        	id: project.data.id,
					    name: project.data.name,
					    description: project.data.description,
					    start_date: new Date(project.data.start_date),
					    end_date: new Date(project.data.end_date),
					    developer_ids: project.devs,
					    technology_ids: project.techs
					});
			    }
		    });
	}

    onSubmit() {
		this.isSubmitted = true;
		this.proService.updatePro(this.projectForm.value)
		    .subscribe(() => {
		    	this.messageService.add("Update project successful");
		    	this.location.back()
		    }
		);
	}

}
