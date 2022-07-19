import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { UsersService } from '../shared/users.service';
import { TripService } from '../shared/trip.service';

import { SingleTripComponent } from './single-trip.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
class MockTripService extends TripService {
  override updateTripData(
    tripdata: any[][],
    tripID: String | null
  ): Observable<any> {
    return of(true);
  }
}
class MockUsersService extends UsersService {}
class MockMessageService extends MessageService {}
describe('SingleTripComponent', () => {
  let component: SingleTripComponent;
  let fixture: ComponentFixture<SingleTripComponent>;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let userServ: UsersService;
  let tripServ: TripService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleTripComponent],
      providers: [
        {
          provide: UsersService,
          useClass: MockUsersService,
        },
        {
          provide: TripService,
          useClass: MockTripService,
        },
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
    userServ = TestBed.inject(UsersService);
    tripServ = TestBed.inject(TripService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SingleTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test showAddFriend', () => {
    component.users = [
      { email: 'haadia@gmail.com', username: 'haadia' },
      { email: 'fahad@gmail.com', username: 'fahad' },
      { email: 'usman.manzoor@10pearls.com', username: 'usman-10p' },
      { email: 'ahmed@gmail.com', username: 'ahmed' },
    ];
    component.friends = ['haadia', 'fahad'];
    const expectedResult = [
      { email: 'usman.manzoor@10pearls.com', username: 'usman-10p' },
      { email: 'ahmed@gmail.com', username: 'ahmed' },
    ];
    jest.spyOn(component, 'showAddFriend');
    component.showAddFriend();
    expect(component.display).toBe(true);
    expect(component.addFriend).toBe(true);
    expect(component.users).toMatchObject(expectedResult);
  });
  it('should test showDisplayFriend', () => {
    jest.spyOn(component, 'showDisplayFriend');
    component.showDisplayFriend();
    expect(component.display).toBe(true);
    expect(component.displayFriend).toBe(true);
  });

  it('should test updateBtnClicked', () => {
    component.updateBtnStatus = [[false]];
    jest.spyOn(component, 'updateBtnClicked');
    component.updateBtnClicked(0, 0);
    expect(component.updateBtnStatus[0][0]).toBeTruthy();
  });

  it('should test deleteAct', () => {
    component.dayData = [
      [{ numberOfAct: 3 }, [{ test: 1 }, { test: 2 }, { test: 3 }]],
    ];
    jest.spyOn(component, 'deleteAct');

    component.updateBtnStatus = [[false, false, false]];
    component.deleteAct(0, 0);
    expect(component.dayData[0][0].numberOfAct).toBe(2);
    expect(component.dayData[0][1].length).toBe(2);
  });

  it('should test addActivity', () => {
    component.dayData = [
      [{ numberOfAct: 3 }, [{ test: 1 }, { test: 2 }, { test: 3 }]],
    ];
    component.updateBtnStatus = [[false]];
    jest.spyOn(component, 'addActivity');

    component.addActivity(0);
    expect(component.updateBtnStatus[0][1]).toBeTruthy();
    expect(component.dayData[0][0].numberOfAct).toBe(4);
    expect(component.dayData[0][1][3]).toMatchObject({
      time: '00:00',
      activity: '',
    });
  });

  it('should test doneClicked', () => {
    component.updateBtnStatus = [[]];
    jest.spyOn(component, 'doneClicked');
    jest.spyOn(tripServ, 'updateTripData');

    component.doneClicked(0, 0);
    expect(component.updateBtnStatus[0][0]).toBeFalsy();
    expect(tripServ.updateTripData).toBeCalledTimes(1);
  });

  it('should test onChange', () => {
    const event = { email: 'ahmedtahir2000@gmail.com', username: 'ahmed' };
    jest.spyOn(component, 'onChange');
    jest.spyOn(tripServ, 'addFriend');
    component.onChange(event);
    expect(component.addFriend).toBeFalsy();
    expect(component.selectedUser.username).toBe('ahmed');
    expect(tripServ.addFriend).toBeCalledTimes(1);
  });

  it('should test closeView', () => {
    component.closeView();
    expect(component.displayFriend).toBeFalsy();
  });

  it('should test removeFriend', () => {
    jest.spyOn(component, 'removeFriend');
    component.friends = ['haadia', 'fahad'];

    component.removeFriend('haadia');
    expect(component.friends).toMatchObject(['fahad']);
    expect(component.users).toMatchObject([{ username: 'haadia' }]);
  });
});
