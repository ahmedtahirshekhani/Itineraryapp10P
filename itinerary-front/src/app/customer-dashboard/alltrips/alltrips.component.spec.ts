import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltripsComponent } from './alltrips.component';
import { TripService } from '../shared/trip.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

// mock TripService
class MockTripService {
  getMyTrip() {}
  updateTripList() {}
  getTripsAsFrnd() {}
  deleteTrip() {}
}

describe('AlltripsComponent', () => {
  let component: AlltripsComponent;
  let fixture: ComponentFixture<AlltripsComponent>;
  let tripService: TripService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let msgService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltripsComponent ],
      imports: [ RouterTestingModule ],
      providers: [ { provide: TripService, useClass: MockTripService },
      MessageService ]
    })
    .compileComponents();

    tripService = TestBed.inject(TripService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    msgService = TestBed.inject(MessageService);

    fixture = TestBed.createComponent(AlltripsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user trip data and populate mytrips list for myPlanners state', () => {
    // create mocked server response
    const mockTripData = [
      {
        _id: 1,
        name: "Test",
        startDate: "04/07/2012"
      },
      {
        _id: 2,
        name: "Test2",
        startDate: "04/07/2013"
      }
    ];

    const mockNewTrip = {
      _id: 3,
      name: "Test3",
      startDate: "06/06/2018"
    };

    // set state
    activatedRoute.data = of( {state: 'myPlanners'} );

    // set spy on service methods
    jest.spyOn(tripService, 'getMyTrip').mockReturnValue(of(mockTripData));
    jest.spyOn(tripService, 'updateTripList').mockReturnValue(of(mockNewTrip));
  
    // trigger the method
    component.ngOnInit();
    
    // verify results
    expect(component.mytrips.length).toBe(3);
    expect(component.mytrips[0]).toEqual(mockTripData[0]);
    expect(component.mytrips[2]).toEqual(mockNewTrip);
  });

  it('should get friends trip data and populate mytrips list for friendPlanners state', () => {
    // create mocked server response
    const mockTripData: Object[] = [
      {
        _id: 1,
        name: "Test",
        startDate: "04/07/2012"
      },
      {
        _id: 2,
        name: "Test2",
        startDate: "04/07/2013"
      }
    ];

    const mockNewTrip = {
      _id: 3,
      name: "Test3",
      startDate: "06/06/2018"
    };

    // set state
    activatedRoute.data = of( {state: 'friendPlanners'} );

    // set spy on service methods
    jest.spyOn(tripService, 'getTripsAsFrnd').mockReturnValue(of(mockTripData));
    const updateSpy = jest.spyOn(tripService, 'updateTripList').mockReturnValue(of(mockNewTrip));
  
    // trigger the method
    component.ngOnInit();
    
    // verify results
    expect(component.mytrips.length).toBe(2);
    expect(component.mytrips[0]).toEqual(mockTripData[0]);
    expect(updateSpy).toHaveBeenCalledTimes(0);
  });

  it('should delete the specified trip', () => {
    // create mocked server response
    const mockTripData = [
      {
        _id: "trip1",
        name: "Test Trip",
        startDate: "04/07/2012",
        urlSlug: "test-trip"
      },
      {
        _id: "trip2",
        name: "Test Enjoy",
        startDate: "04/07/2013",
        urlSlug: "test-enjoy"
      }
    ];

    // set state
    activatedRoute.data = of( {state: 'myPlanners'} );

    // setup click event
    const event: Event = new Event('click');

    // set spies on service methods
    jest.spyOn(tripService, 'updateTripList').mockReturnValue(of());
    const tripSpy = jest.spyOn(tripService, 'getMyTrip').mockReturnValue(of(mockTripData));
    const deleteSpy = jest.spyOn(tripService, 'deleteTrip').mockReturnValue(of({
      success: true
    }));
    const msgSpy = jest.spyOn(msgService, 'add'); 

    // cause onInit life cycle to execute - set up trip cards
    fixture.detectChanges();
    expect(tripSpy).toHaveBeenCalled();

    // trigger delete button click of specified trip - "Test Trip"
    const tripDeleteBtn = fixture.debugElement.query(By.css('#test-trip-btn'));
    tripDeleteBtn.nativeElement.click();

    // verify results
    expect(deleteSpy).toHaveBeenCalledWith("trip1");
    expect(component.mytrips.length).toEqual(1);
    expect(component.mytrips[0].name).toEqual("Test Enjoy");
    expect(msgSpy).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Removed',
      detail: 'Trip removed',
      life: 3000,
    });
  });

  it('should navigate to specified trip page', () => {
    // create mocked server response
    const mockTripData = [
      {
        _id: "trip1",
        name: "Test Trip",
        startDate: "04/07/2012",
        urlSlug: "test-trip"
      },
      {
        _id: "trip2",
        name: "Test Enjoy",
        startDate: "04/07/2012",
        urlSlug: "test-enjoy"
      }
    ];

    // set state
    activatedRoute.data = of( {state: 'myPlanners'} );

    // set a spies on service method
    const getTripSpy = jest.spyOn(tripService, 'getMyTrip').mockReturnValue(of(mockTripData));
    const updateTripSpy = jest.spyOn(tripService, 'updateTripList').mockReturnValue(of());
    const cardClickSpy = jest.spyOn(component, 'tripCardClicked');
    const navSpy = jest.spyOn(router, 'navigate');

    // cause onInit life cycle to execute - set up trip cards
    fixture.detectChanges();
    expect(getTripSpy).toHaveBeenCalled();

    // find the div element of the relevant trip card
    const divEle = fixture.debugElement.query(By.css('#test-enjoy'));
    // trigger a card click event - executing tripCardClicked
    divEle.nativeElement.click();

    // verify results
    expect(divEle.nativeElement).toBeTruthy();
    expect(cardClickSpy).toHaveBeenCalledWith('trip2');
    expect(navSpy).toHaveBeenCalledWith(['dashboard/trip2'], {state: "myPlanners"});
  });
});
