import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('TripService', () => {
  let service: TripService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // provide service-under-test and its dependencies
      providers: [TripService],
    });
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = {
      get: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    };
    service = new TripService(httpClientSpy);
  });

  afterEach(() => {
    // after each test verfiy that there are no pending requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getMyTrip', (done) => {
    const mockResult = 'mockresult';
    const url = '/api/v1/trips';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(mockResult));
    service.getMyTrip().subscribe({
      next: (res) => {
        expect(res).toEqual(mockResult);
        done();
      },
    });
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test getMyTrip throws error', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });
    const url = '/api/v1/trips';
    jest
      .spyOn(httpClientSpy, 'get')
      .mockReturnValue(throwError(() => errorResponse));
    service.getMyTrip().subscribe({
      next: (res) => console.log(res),
      error: (error) => {
        expect(error.error).toContain('test 404 error');
        done();
      },
    });
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test getSingleTripData', (done) => {
    const mockResult = 'mockresult';
    const url = '/api/v1/trips/tripnamedemo';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(mockResult));
    service.getSingleTripData('tripnamedemo').subscribe({
      next: (res) => {
        expect(res).toEqual(mockResult);
        done();
      },
    });
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test updateTripData', (done) => {
    const mockResult = 'mockresult';
    const command = [['testing']];
    const url = '/api/v1/trips/1234';
    jest.spyOn(httpClientSpy, 'put').mockReturnValue(of(mockResult));
    service.updateTripData(command, '1234').subscribe({
      next: (res) => {
        expect(res).toEqual(mockResult);
        done();
      },
    });
    expect(httpClientSpy.put).toBeCalledTimes(1);
    expect(httpClientSpy.put).toHaveBeenCalledWith(url, { data: command });
  });

  it('should test addFriend', (done) => {
    const mockResult = 'mockresult';
    const command = 'testing';
    const url = '/api/v1/trips/friends/1234';
    jest.spyOn(httpClientSpy, 'patch').mockReturnValue(of(mockResult));
    service.addFriend(command, '1234').subscribe({
      next: (res) => {
        expect(res).toEqual(mockResult);
        done();
      },
    });
    expect(httpClientSpy.patch).toBeCalledTimes(1);
    expect(httpClientSpy.patch).toHaveBeenCalledWith(url, {
      friendToAdd: command,
    });
  });

  it('should test removeFriend', (done) => {
    const mockResult = 'mockresult';
    const command = 'testing';
    const url = '/api/v1/trips/friends/1234';
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(mockResult));
    service.removeFriend(command, '1234').subscribe({
      next: (res) => {
        expect(res).toEqual(mockResult);
        done();
      },
    });
    expect(httpClientSpy.post).toBeCalledTimes(1);
    expect(httpClientSpy.post).toHaveBeenCalledWith(url, {
      friendToDel: command,
    });
  });

  it('should test getTripsAsFrnd', (done) => {
    const mockResult = 'mockresult';
    const command = 'testing';
    const url = '/api/v1/trips/others';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(mockResult));
    service.getTripsAsFrnd().subscribe({
      next: (res) => {
        expect(res).toEqual(mockResult);
        done();
      },
    });
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test addNewTrip', (done) => {
    const name = 'try';
    const startDate = '23-02-12';
    const days = 5;
    const destination = 'Swat';
    const imageUrl = 'http://test.com';
    const urlSlug = 'test-trip';

    const mockResult = 'mockresult';
    const command = 'testing';
    const url = '/api/v1/trips/others';
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(mockResult));
    service
      .addNewTrip(name, startDate, days, destination, imageUrl, urlSlug)
      .subscribe({
        next: (res) => {
          expect(res).toEqual(mockResult);
          done();
        },
      });
    expect(httpClientSpy.post).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });
});
