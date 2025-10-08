// src/components/passeios/SeatMap.jsx
export function SeatMap({ capacidade, passageirosAlocados = [], onSeatClick }) {
    const assentosOcupados = passageirosAlocados.map(p => p.poltrona);

    const generateSeats = () => {
        const rows = [];
        let seatNumber = 1;

        while (seatNumber <= capacidade) {
            const rowSeats = [];
            const seat1 = seatNumber;
            const seat2 = seatNumber + 1;
            const seat3 = seatNumber + 2;
            const seat4 = seatNumber + 3;

            if (seat1 <= capacidade) rowSeats.push({ number: seat1, side: 'left' });
            if (seat2 <= capacidade) rowSeats.push({ number: seat2, side: 'left' });
            // Adicionamos na ordem correta para a renderização (4 depois 3)
            if (seat4 <= capacidade) rowSeats.push({ number: seat4, side: 'right' });
            if (seat3 <= capacidade) rowSeats.push({ number: seat3, side: 'right' });

            rows.push(rowSeats);
            seatNumber += 4;
        }
        return rows;
    };

    const renderSeat = (seat) => {
        const isOccupied = assentosOcupados.includes(seat.number);
        const style = {
            border: '1px solid black',
            borderRadius: '5px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '5px',
            cursor: isOccupied ? 'not-allowed' : 'pointer',
            backgroundColor: isOccupied ? '#FCC98A' : '#E4F7FE',
        };

        const handleClick = () => {
            if (!isOccupied && onSeatClick) {
                onSeatClick(seat.number);
            }
        };

        return <div key={seat.number} style={style} onClick={handleClick}>{seat.number}</div>;
    };

    return (
        <div style={{ border: '2px solid #333', padding: '10px', borderRadius: '5px' }}>
            <h4>Frente do Ônibus</h4>
            {generateSeats().map((row, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ display: 'flex' }}>
                        {row.filter(s => s.side === 'left').map(renderSeat)}
                    </div>
                    <div style={{ width: '50px' }}></div> {/* Corredor */}
                    <div style={{ display: 'flex' }}>
                        {/* AGORA CORRETO: Renderiza na ordem em que foi gerado (4, depois 3) */}
                        {row.filter(s => s.side === 'right').map(renderSeat)}
                    </div>
                </div>
            ))}
        </div>
    );
}