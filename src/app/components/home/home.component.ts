import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Properties } from 'src/app/models/properties';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    //@ViewChild('stepper') stepper:MatStepper;
    public spinnerName :string
    addMainFoodGroup: FormGroup;
    extraPropertiesAddForm: FormGroup;
    addCookingTimeFormGroup:FormGroup;
    cookingTime:number;
    property1: Properties = {
        Id: 1,
        PropertyName: 'Marul Turşu',
        Quantity: 5,
    };

    property2: Properties = {
        Id: 2,
        PropertyName: 'Paket Sos',
        Quantity: 5,
    };

    property3: Properties = {
        Id: 3,
        PropertyName: 'Soğan',
        Quantity: 5,
    };

    property4: Properties = {
        Id: 4,
        PropertyName: 'Köfte',
        Quantity: 5,
    };

    property5: Properties = {
        Id: 5,
        PropertyName: 'Tavuk',
        Quantity: 5,
    };

    property6: Properties = {
        Id: 6,
        PropertyName: 'Domates',
        Quantity: 5,
    };

    property7: Properties = {
        Id: 7,
        PropertyName: 'Ekmek',
        Quantity: 5,
    };

    property8: Properties = {
        Id: 8,
        PropertyName: 'Patates',
        Quantity: 5,
    };

    property9: Properties = {
        Id: 9,
        PropertyName: 'Cola',
        Quantity: 5,
    };

    materials: Properties[] = [
        this.property1,
        this.property2,
        this.property3,
        this.property4,
        this.property5,
        this.property6,
        this.property7,
        this.property8,
        this.property9,
    ];

    constructor(
        private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.createExtraPropertiesAddForm();
        this.createAddMainFoodGroup();
        this.createAddCookingTimeFormGroup();
    }
    createAddCookingTimeFormGroup(){
        this.addCookingTimeFormGroup=this.formBuilder.group({
        azPismis: ['', Validators.required],
        ortaPismis: ['', Validators.required],
        cokPismis: ['', Validators.required],
        })
    }
    createExtraPropertiesAddForm() {
        this.extraPropertiesAddForm = this.formBuilder.group({
            'Marul Turşu': ['', Validators.required],
            'Paket Sos': ['', Validators.required],
            Soğan: ['', Validators.required],
            Domates: ['', Validators.required],
            Ekmek: ['', Validators.required],
            Patates: ['', Validators.required],
            Cola: ['', Validators.required],
        });
    }
    createAddMainFoodGroup() {
        this.addMainFoodGroup = this.formBuilder.group({
            Köfte: ['', ''],
            Tavuk: ['', ''],
        });
    }

    isKofte: boolean = false;
    isEnough: boolean = true;

    addExtraProperties(stepper: MatStepper) {
        this.spinnerName="Checking Properties"
        this.spinner.show();
        let propertiesModel = Object.assign(
            {},
            this.extraPropertiesAddForm.value
        );
        setTimeout(() => {
            this.spinner.hide();
            this.materials.forEach((element: any) => {
                if (propertiesModel[element.PropertyName]) {
                    if (element.Quantity > 0) {
                        element.Quantity -= 1;
                    } else {
                        this.isEnough = false;
                    }
                }
            });
            if (this.isEnough) {
                this.toastrService.success('enough material is available');
                stepper.selected.completed = true;
                stepper.next();
            } else {
                this.toastrService.error('material is not enough');
            }
        }, 3000);
    }

    addMainFood(stepper: MatStepper) {
        if (!this.isKofte) {
            this.materials.forEach((element: any) => {
                    if(element.propertyName=="Tavuk")
                    {
                        element.Quantity-=1
                    }
            });
            this.spinnerName="Preparing Burger Menu"
            this.spinner.show().then(() => {
                setTimeout(() => {
                            
                            setTimeout(() => {
                                this.toastrService.success('cooking is done');
                                this.spinnerName="Frying Patoto"
                            }, 3000);
                            setTimeout(() => {
                                this.toastrService.success('hamburger is done');
                                this.spinnerName="Cooking"
                            }, 2000);
                            setTimeout(() => {
                                this.toastrService.success('patato is fried');
                                this.spinnerName="Done"
                            }, 5000);
                            setTimeout(() => {
                                this.toastrService.success('Drink is ready');
                                this.spinnerName="Cooking"
                            }, 2000);
                            setTimeout(() => {
                                this.toastrService.success('placed on the tray');
                                this.toastrService.success('has been served');
                                this.spinner.hide()
                                stepper.selected.completed = true;
                                stepper.reset()
                            }, 5000);
                            
            },1000);
                })
                
            }
            else{
                
                this.materials.forEach((element: any) => {
                    if(element.propertyName=="Köfte")
                    {
                        element.Quantity-=1
                    }
                    stepper.selected.completed = true;
                    stepper.next();

            });

            }
        }

        addCookingTime(stepper: MatStepper){
            
            let propertiesModel = Object.assign({},this.addCookingTimeFormGroup.value);
            if(propertiesModel.azPismis){
                 this.cookingTime=2000
            }
            else if (propertiesModel.ortaPismis) {
                this.cookingTime=3000
            }
            else if (propertiesModel.cokPismis) {
                this.cookingTime=4000
            }
            this.spinnerName="Preparing Burger Menu"
            this.spinner.show().then(() => {
                setTimeout(() => {
                            setTimeout(() => {
                                this.toastrService.success('cooking is done');
                                this.spinnerName="Frying Patoto"
                            },this.cookingTime);
                            setTimeout(() => {
                                this.toastrService.success('hamburger is done');
                                this.spinnerName="Cooking"
                            }, 2000);
                            setTimeout(() => {
                                this.toastrService.success('patato is fried');
                                this.spinnerName="Done"
                            }, 5000);
                            setTimeout(() => {
                                this.toastrService.success('Drink is ready');
                                this.spinnerName="Cooking"
                            }, 2000);
                            setTimeout(() => {
                                this.toastrService.success('placed on the tray');
                                this.toastrService.success('has been served');
                                this.spinner.hide()
                                stepper.selected.completed = true;
                                stepper.reset()
                            }, 5000);
                            
            },1000);
                })
        }
    }



