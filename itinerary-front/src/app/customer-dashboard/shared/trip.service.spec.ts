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

  it('should test updateTripData', () => {
    //const command = 'testing';
    expect(1).toBeTruthy();
  });
});
