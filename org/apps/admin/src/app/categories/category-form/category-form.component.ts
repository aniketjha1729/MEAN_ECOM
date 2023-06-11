import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@org/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private locationService: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const category: Category = {
        name: this.getCategory().name.value,
        icon: this.getCategory().icon.value,
      };
      this.categoryService.createCategory(category).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Message Content',
          });
          timer(2000)
            .toPromise()
            .then((done) => {
              this.locationService.back();
            });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Message Content',
          });
        }
      );
    }
  }

  getCategory() {
    return this.form.controls;
  }
}
