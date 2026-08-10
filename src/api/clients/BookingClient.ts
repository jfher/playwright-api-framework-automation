import { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { ApiClient } from '../ApiClient';
import { Booking, BookingResponse } from '@models/Booking';

export class BookingClient extends ApiClient {
  constructor(request: APIRequestContext, testInfo: TestInfo) {
    super(request, testInfo);
  }

  async createBookingResponse(booking: Booking): Promise<APIResponse> {
    return this.post('/booking', booking);
  }

  async createBooking(booking: Booking): Promise<BookingResponse> {
    const response = await this.post('/booking', booking);
    return response.json();
  }

  async getBookingResponse(bookingId: number): Promise<APIResponse> {
    return this.get(`/booking/${bookingId}`);
  }

  async getBooking(bookingId: number): Promise<Booking> {
    const response = await this.get(`/booking/${bookingId}`);
    return response.json();
  }

  async getBookingsResponse(): Promise<APIResponse> {
    return this.get(`/booking`);
  }

  async getBookings(): Promise<Booking[]> {
    const response = await this.get(`/booking`);
    return response.json();
  }

  async updateBookingResponse(bookingId: number, booking: Booking, token: string): Promise<APIResponse> {
    return this.put(`/booking/${bookingId}`, booking, token);
  }

  async updateBooking(bookingId: number, booking: Booking, token: string): Promise<Booking> {
    const response = await this.put(`/booking/${bookingId}`, booking, token);
    return response.json();
  }

  async updateBookingWithoutAuth(bookingId: number, booking: Booking): Promise<APIResponse> {
    return this.put(`/booking/${bookingId}`, booking);
  }

  async deleteBookingResponse(bookingId: number, token?: string): Promise<APIResponse> {
    return this.delete(`/booking/${bookingId}`, token);
  }

  async deleteBooking(bookingId: number, token: string) {
    await this.delete(`/booking/${bookingId}`, token);
  }

  async deleteBookingWithoutAuth(bookingId: number): Promise<APIResponse> {
    return this.request.delete(`/booking/${bookingId}`);
  }
}
