import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePlannerComponent } from './create-planner.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationsService } from '../shared/locations.service';
import { TripService } from '../shared/trip.service';
import { of } from 'rxjs';

// mocked TripService
class MockTripService {
  addNewTrip(
    name: string,
    startDate: String,
    days: number,
    destination: string,
    imageUrl: String,
    urlSlug: String
  ) { }

  updateNewTrip(trip: any): void { }
}

// mocked LocationsService
class MockLocationsService {
  getLocations(){
    return of({    
      "success": true,
      "message": [
        {
          "_id": "1",
          "name": "France",
          "subPlaces": [
            "Paris"
          ],
          "imageUrl": "https://www.test.com",
        },
        {
          "_id": "2",
          "name": "USA",
          "subPlaces": [
            "New York"
          ],
          "imageUrl": "https://www.test.com",
        }
      ]
    });
  }
}

describe('CreatePlannerComponent', () => {
  let component: CreatePlannerComponent;
  let fixture: ComponentFixture<CreatePlannerComponent>;
  let dialogRef: DynamicDialogRef;
  let locationService: LocationsService;
  let tripService: TripService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlannerComponent ],
      imports: [ ReactiveFormsModule, DialogModule, DynamicDialogModule ],
      providers: [
        DynamicDialogRef,
        { provide: LocationsService, useClass: MockLocationsService },
        { provide: TripService, useClass: MockTripService }
      ]
    })
    .compileComponents();

    locationService = TestBed.inject(LocationsService);
    tripService = TestBed.inject(TripService);

    dialogRef = TestBed.inject(DynamicDialogRef)
    fixture = TestBed.createComponent(CreatePlannerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // restore all mocks to initial states
    jest.restoreAllMocks();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow form submission if form value is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // set invalid form values
    component.tripForm.setValue({
      "name": "",
      "startDate": null,
      "days": null,
      "destination": ""
    });
    // check if form state is invalid
    fixture.detectChanges();
    expect(component.tripForm.valid).toBeFalsy();
    expect(compiled.querySelector('button')?.disabled).toBeTruthy();
  });

  it('should allow form submission if form value is valid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // set valid form values
    component.tripForm.setValue({
      "name": "Test Trip",
      "startDate": new Date(),
      "days": 12,
      "destination": { name: "Manshera", url: "test-url"}
    });
    // check if form is valid
    fixture.detectChanges();
    expect(component.tripForm.valid).toBeTruthy();
    expect(compiled.querySelector('button')?.disabled).toBeFalsy();
  });

  it('should return name form control', () => {
    // set spy on the method
    const spy = jest.spyOn(component, 'name', 'get');
    // set value using the getter
    component.name.setValue('Fahad');
    // check if method called and if value is set
    const control = component.name;
    expect(spy).toHaveBeenCalled();
    expect(control).toBeInstanceOf(AbstractControl);
    expect(control.value).toEqual('Fahad');
  });

  it('should return startDate form control value', () => {
    // set spy on the method
    const spy = jest.spyOn(component, 'startDate', 'get');
    // set value
    component.tripForm.get('startDate')?.setValue(new Date(2018, 5, 20));
    // call method and verfiy value
    const dateVal = component.startDate;
    expect(spy).toHaveBeenCalled();
    expect(dateVal).toEqual(new Date(2018, 5, 20));
  });

  it('should return days form control value', () => {
    // set spy on the method
    const spy = jest.spyOn(component, 'days', 'get');
    // set value
    component.tripForm.get('days')?.setValue(12);
    // call method and verfiy value
    const numDays = component.days;
    expect(spy).toHaveBeenCalled();
    expect(numDays).toEqual(12);
  });
  
  it('should return destination form control value', () => {
    // set spy on the method
    const spy = jest.spyOn(component, 'destination', 'get');
    // set value
    const destinationValue = {
      name: "Swat",
      url: "www.swat.com"
    };
    component.tripForm.get('destination')?.setValue(destinationValue);
    // call method and verfiy value
    const setDestination = component.destination;
    expect(spy).toHaveBeenCalled();
    expect(setDestination).toEqual(destinationValue);
  });

  it('should return the required formatted url-slug', () => {
    // set trip name value
    component.name.setValue('Enjoy Trip');
    // call url slug helper function
    const slug = component.getUrlSlug();
    // verify
    expect(slug).toEqual('enjoy-trip');
  });

  it('should return the trip name in required format', () => {
    // set invalid trip name format
    component.name.setValue('enjoy trip');
    // call helper trip name formatter function
    const formattedName = component.getTripNameFormat();
    // verify
    expect(formattedName).toEqual('Enjoy Trip');
  });

  it('should load the list of locations', () => {
    // set spies on service
    const spy = jest.spyOn(locationService, 'getLocations');
    // invoke init lifecycle hook
    component.ngOnInit();
    // check if service method is called
    expect(spy).toHaveBeenCalled();
    // check if cities list is populated as expected
    expect(component.cities).toEqual([
      {
        "name": "France",
        "url": "https://www.test.com"
      },
      {
        "name": "USA",
        "url": "https://www.test.com"
      }
    ]);
  });

  it('should handle successful trip addition', () => {
    // set spies on TripService
    const addSpy = jest.spyOn(tripService, 'addNewTrip').mockReturnValue(of({
      success: true
    }));
    const updateSpy = jest.spyOn(tripService, 'updateNewTrip');
    const dialogSpy = jest.spyOn(dialogRef, 'close');

    // set valid form values
    component.tripForm.setValue({
      "name": "test trip",
      "startDate": new Date(2018, 11, 24),
      "days": 12,
      "destination": { name: "Manshera", url: "https://www.test.com"}
    });
    // trigger form submission
    component.addTrip();

    // perform checks
    expect(addSpy).toHaveBeenCalledWith(
      "Test Trip",
      "24/12/2018",
      12,
      "Manshera",
      "https://www.test.com",
      "test-trip"
    );
    expect(updateSpy).toHaveBeenCalledWith({
      name: "Test Trip",
      startDate: "24/12/2018",
      days: 12,
      destination: "Manshera",
      imageUrl: "https://www.test.com",
      urlSlug: "test-trip",
      createdOn: new Date().toLocaleDateString('en-GB')
    });
    expect(dialogSpy).toHaveBeenCalledWith(true);
  });

  it('should handle failed trip addition', () => {
    // set spies on TripService
    const addSpy = jest.spyOn(tripService, 'addNewTrip').mockReturnValue(of({
      success: false
    }));
    const updateSpy = jest.spyOn(tripService, 'updateNewTrip');
    const dialogSpy = jest.spyOn(dialogRef, 'close');

    // set valid form values
    component.tripForm.setValue({
      "name": "test trip",
      "startDate": new Date(2018, 11, 24),
      "days": 12,
      "destination": { name: "Manshera", url: "https://www.test.com"}
    });
    // trigger form submission
    component.addTrip();

    // perform checks
    expect(addSpy).toHaveBeenCalledWith(
      "Test Trip",
      "24/12/2018",
      12,
      "Manshera",
      "https://www.test.com",
      "test-trip"
    );
    expect(updateSpy).toBeCalledTimes(0);
    expect(dialogSpy).toHaveBeenCalledWith(false);
  });

});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePlannerComponent } from '../create-planner/create-planner.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocationsService } from '../shared/locations.service';
import { TripService } from '../shared/trip.service';
import { of } from 'rxjs';

// mocked TripService
class MockTripService {
  addNewTrip(
    name: string,
    startDate: String,
    days: number,
    destination: string,
    imageUrl: String,
    urlSlug: String
  ) {}

  updateNewTrip(trip: any): void {}
}

// mocked LocationsService
class MockLocationsService {
  getLocations() {
    return of({
      success: true,
      message: [
        {
          _id: '1',
          name: 'France',
          subPlaces: ['Paris'],
          imageUrl: 'https://www.test.com',
        },
        {
          _id: '2',
          name: 'USA',
          subPlaces: ['New York'],
          imageUrl: 'https://www.test.com',
        },
      ],
    });
  }
}

describe('CreatePlannerComponent', () => {
  let component: CreatePlannerComponent;
  let fixture: ComponentFixture<CreatePlannerComponent>;
  let dialogRef: DynamicDialogRef;
  let locationService: LocationsService;
  let tripService: TripService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePlannerComponent],
      imports: [ReactiveFormsModule, DialogModule, DynamicDialogModule],
      providers: [
        DynamicDialogRef,
        { provide: LocationsService, useClass: MockLocationsService },
        { provide: TripService, useClass: MockTripService },
      ],
    }).compileComponents();

    locationService = TestBed.inject(LocationsService);
    tripService = TestBed.inject(TripService);

    dialogRef = TestBed.inject(DynamicDialogRef);
    fixture = TestBed.createComponent(CreatePlannerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // restore all mocks to initial states
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow form submission if form value is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // set invalid form values
    component.tripForm.setValue({
      name: '',
      startDate: null,
      days: null,
      destination: '',
    });
    // check if form state is invalid
    fixture.detectChanges();
    expect(component.tripForm.valid).toBeFalsy();
    expect(compiled.querySelector('button')?.disabled).toBeTruthy();
  });

  it('should allow form submission if form value is valid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // set valid form values
    component.tripForm.setValue({
      name: 'Test Trip',
      startDate: new Date(),
      days: 12,
      destination: { name: 'Manshera', url: 'test-url' },
    });
    // check if form is valid
    fixture.detectChanges();
    expect(component.tripForm.valid).toBeTruthy();
    expect(compiled.querySelector('button')?.disabled).toBeFalsy();
  });

  it('should return name form control', () => {
    // set spy on the method
    const spy = jest.spyOn(component, 'name', 'get');
    // set value using the getter
    component.name.setValue('Fahad');
    // check if method called and if value is set
    const control = component.name;
    expect(spy).toHaveBeenCalled();
    expect(control).toBeInstanceOf(AbstractControl);
    expect(control.value).toEqual('Fahad');
  });

  it('should return startDate form control value', () => {
    // set spy on the method
    const spy = jest.spyOn(component, 'startDate', 'get');
    // set value
    component.tripForm.get('startDate')?.setValue(new Date(2018, 5, 20));
    // call method and verfiy value
    const dateVal = component.startDate;
    expect(spy).toHaveBeenCalled();
    expect(dateVal).toEqual(new Date(2018, 5, 20));
  });

  it('should return days form control value', () => {
    // set spy on the method
    const spy = jest.spyOn(component, 'days', 'get');
    // set value
    component.tripForm.get('days')?.setValue(12);
    // call method and verfiy value
    const numDays = component.days;
    expect(spy).toHaveBeenCalled();
    expect(numDays).toEqual(12);
  });

  it('should return destination form control value', () => {
    // set spy on the method
    const spy = jest.spyOn(component, 'destination', 'get');
    // set value
    const destinationValue = {
      name: 'Swat',
      url: 'www.swat.com',
    };
    component.tripForm.get('destination')?.setValue(destinationValue);
    // call method and verfiy value
    const setDestination = component.destination;
    expect(spy).toHaveBeenCalled();
    expect(setDestination).toEqual(destinationValue);
  });

  it('should return the required formatted url-slug', () => {
    // set trip name value
    component.name.setValue('Enjoy Trip');
    // call url slug helper function
    const slug = component.getUrlSlug();
    // verify
    expect(slug).toEqual('enjoy-trip');
  });

  it('should return the trip name in required format', () => {
    // set invalid trip name format
    component.name.setValue('enjoy trip');
    // call helper trip name formatter function
    const formattedName = component.getTripNameFormat();
    // verify
    expect(formattedName).toEqual('Enjoy Trip');
  });

  it('should load the list of locations', () => {
    // set spies on service
    const spy = jest.spyOn(locationService, 'getLocations');
    // invoke init lifecycle hook
    component.ngOnInit();
    // check if service method is called
    expect(spy).toHaveBeenCalled();
    // check if cities list is populated as expected
    expect(component.cities).toEqual([
      {
        name: 'France',
        url: 'https://www.test.com',
      },
      {
        name: 'USA',
        url: 'https://www.test.com',
      },
    ]);
  });

  it('should handle successful trip addition', () => {
    // set spies on TripService
    const addSpy = jest.spyOn(tripService, 'addNewTrip').mockReturnValue(
      of({
        success: true,
      })
    );
    const updateSpy = jest.spyOn(tripService, 'updateNewTrip');
    const dialogSpy = jest.spyOn(dialogRef, 'close');

    // set valid form values
    component.tripForm.setValue({
      name: 'test trip',
      startDate: new Date(2018, 11, 24),
      days: 12,
      destination: { name: 'Manshera', url: 'https://www.test.com' },
    });
    // trigger form submission
    component.addTrip();

    // perform checks
    expect(addSpy).toHaveBeenCalledWith(
      'Test Trip',
      '24/12/2018',
      12,
      'Manshera',
      'https://www.test.com',
      'test-trip'
    );
    expect(updateSpy).toHaveBeenCalledWith({
      name: 'Test Trip',
      startDate: '24/12/2018',
      days: 12,
      destination: 'Manshera',
      imageUrl: 'https://www.test.com',
      urlSlug: 'test-trip',
      createdOn: new Date().toLocaleDateString('en-GB'),
    });
    expect(dialogSpy).toHaveBeenCalledWith(true);
  });

  it('should handle failed trip addition', () => {
    // set spies on TripService
    const addSpy = jest.spyOn(tripService, 'addNewTrip').mockReturnValue(
      of({
        success: false,
      })
    );
    const updateSpy = jest.spyOn(tripService, 'updateNewTrip');
    const dialogSpy = jest.spyOn(dialogRef, 'close');

    // set valid form values
    component.tripForm.setValue({
      name: 'test trip',
      startDate: new Date(2018, 11, 24),
      days: 12,
      destination: { name: 'Manshera', url: 'https://www.test.com' },
    });
    // trigger form submission
    component.addTrip();

    // perform checks
    expect(addSpy).toHaveBeenCalledWith(
      'Test Trip',
      '24/12/2018',
      12,
      'Manshera',
      'https://www.test.com',
      'test-trip'
    );
    expect(updateSpy).toBeCalledTimes(0);
    expect(dialogSpy).toHaveBeenCalledWith(false);
  });
});
