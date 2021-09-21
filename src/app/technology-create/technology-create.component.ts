import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';

import { Technology } from '../technology';
import { TechnologyService } from '../technology.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-technology-create',
    templateUrl: './technology-create.component.html',
    styleUrls: ['./technology-create.component.css']
})
export class TechnologyCreateComponent implements OnInit {
    @Input() techs?: any;

    constructor(
    	private route: ActivatedRoute,
		private techService: TechnologyService,
		private location: Location,
		private formBuilder: FormBuilder,
		private messageService: MessageService) { }

    ngOnInit(): void {
    }

    add(name: string): void {
    	name = name.trim();
		if (!name) { return; }
		this.techService.addTech({ name } as Technology)
		    .subscribe(() => {
		    this.messageService.add("Add technology successful");
		    this.location.back()
		});
    }

}
