// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; 

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { LocationsService } from './locations.service';

const mockResponse = {
  "success": true,
  "message": [
    {
      "_id": "62b99e2e73bdbc63ab95463a",
      "name": "Swat",
      "subPlaces": [
        "Kalam",
        "Malam Jabba",
        "Kumrat"
      ],
      "imageUrl": "https://www.visitswatvalley.com/images/visit-lake-in-swat.jpg"
    },
    {
      "_id": "62b99f9073bdbc63ab95463b",
      "name": "Mansehra",
      "subPlaces": [
        "Naran",
        "Kaghan"
      ],
      "imageUrl": "https://historypak.com/wp-content/uploads/2014/03/Mansehra-Photos-Pics-3-1024x768.jpg"
    }
  ]
}

describe('LocationsService', () => {
  let service: LocationsService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // provide service-under-test and its dependencies
      providers: [ LocationsService ]
    });
    // inject the http, test controller and service-under-test
    service = TestBed.inject(LocationsService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // after each test verfiy that there are no pending requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of locations', (done) => {
    service.getLocations().subscribe((res: any) => {
      expect(res.message.length).toBe(2);
      expect(res.success).toBeTruthy();
      expect(res).toEqual(mockResponse);
      done();
    });

    // check for correct response - GET from expected URL
    const req = httpTestingController.expectOne({
      url: '/api/v1/locations',
      method: 'GET'
    });

    // provide each request with a mock response
    req.flush(mockResponse);
  });
});
