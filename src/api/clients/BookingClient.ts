import { ApiClient } from '../ApiClient';
import { Booking, BookingResponse } from '@models/Booking';

export class BookingClient extends ApiClient {
  async createBooking(booking: Booking): Promise<BookingResponse> {
    return this.post<BookingResponse>('/booking', booking);
  }

  async getBooking(id: number): Promise<Booking> {
    return this.get<Booking>(`/booking/${id}`);
  }

  async getBookings(): Promise<Booking> {
    return this.get<Booking>(`/booking`);
  }

  async updateBooking(id: number, booking: Booking, token: string): Promise<Booking> {
    return this.put<Booking>(`/booking/${id}`, booking, token);
  }

  async deleteBooking(id: number, token: string) {
    return this.delete(`/booking/${id}`, token);
  }
}
