import React from 'react';
import { Table, TableBody, TableHeader } from '../../../../common/Table';
import BookingTableRow from './BookingTableRow';

const BookingTable = ({ bookings, roomNumber }) => {
  const headCells = [
    { id: 'arrivalDate', label: 'Дата заезда' },
    { id: 'departureDate', label: 'Дата выезда' },
    { id: 'guests', label: 'Количество гостей' },
    { id: 'totalPrice', label: 'Итоговая стоимость', numeric: true },
  ];
  return (
    <>
      <h3 style={{ margin: 10 }}>{`Список бронирований номера №${roomNumber}`}</h3>
      <Table size='small' aria-label='purchases'>
        <TableHeader headCells={headCells} />
        <TableBody>
          {bookings.map(bookingRow => (
            <BookingTableRow key={bookingRow._id} row={bookingRow} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BookingTable;
