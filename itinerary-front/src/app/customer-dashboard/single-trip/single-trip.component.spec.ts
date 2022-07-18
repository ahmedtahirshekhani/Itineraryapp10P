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

describe('SingleTripComponent', () => {
  let component: SingleTripComponent;
  let fixture: ComponentFixture<SingleTripComponent>;
  let UsersServiceMock: any;
  let TripServiceMock: any;
  let MessageServiceMock: any;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    UsersServiceMock = {
      getUsers: jest.fn(),
    };

    TripServiceMock = {
      getSingleTripData: jest.fn(),
      updateTripData: jest.fn(),
      addFriend: jest.fn(),
      removeFriend: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [SingleTripComponent],
      providers: [
        {
          provide: UsersService,
          useValue: UsersServiceMock,
        },
        {
          provide: TripService,
          useValue: TripServiceMock,
        },
        {
          provide: MessageService,
          useValue: MessageServiceMock,
        },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SingleTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
