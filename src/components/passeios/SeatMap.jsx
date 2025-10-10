// src/components/passeios/SeatMap.jsx

/**
 * Componente que renderiza um mapa de assentos de ônibus dinamicamente.
 * @param {object} props
 * @param {number} props.capacidade - O número total de assentos.
 * @param {Array} props.passageirosAlocados - Lista de passageiros que já têm assento.
 * @param {Function} props.onSeatSelect - Função a ser chamada quando qualquer assento é clicado.
 *                                        Retorna (seatNumber, alocacao | null).
 */
export function SeatMap({ capacidade, passageirosAlocados = [], onSeatSelect }) {
    // Cria um Map para acesso rápido aos dados de alocação pela poltrona.
    // Ex: alocacaoMap.get(10) retorna os dados do passageiro na poltrona 10.
    const alocacaoMap = new Map(passageirosAlocados.map(p => [p.poltrona, p]));

    /**
     * Gera a estrutura de fileiras e assentos com base na capacidade e na regra de negócio.
     * Regra: 1 2 | 4 3
     */
    const generateSeats = () => {
        const rows = [];
        let seatNumber = 1;

        while (seatNumber <= capacidade) {
            const rowSeats = [];
            const seat1 = seatNumber;
            const seat2 = seatNumber + 1;
            const seat3 = seatNumber + 2;
            const seat4 = seatNumber + 3;

            // Adiciona os assentos da esquerda
            if (seat1 <= capacidade) rowSeats.push({ number: seat1, side: 'left' });
            if (seat2 <= capacidade) rowSeats.push({ number: seat2, side: 'left' });

            // Adiciona os assentos da direita na ordem visual correta (4 antes de 3)
            if (seat4 <= capacidade) rowSeats.push({ number: seat4, side: 'right' });
            if (seat3 <= capacidade) rowSeats.push({ number: seat3, side: 'right' });

            rows.push(rowSeats);
            seatNumber += 4; // Pula para a próxima fileira
        }
        return rows;
    };

    /**
     * Renderiza um único assento, decidindo sua cor e comportamento.
     * @param {object} seat - O objeto do assento com { number, side }.
     */
    const renderSeat = (seat) => {
        const passageiroNaPoltrona = alocacaoMap.get(seat.number);
        const isOccupied = !!passageiroNaPoltrona;

        const style = {
            border: '1px solid black',
            borderRadius: '5px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '5px',
            cursor: onSeatSelect ? 'pointer' : 'default', // O cursor vira uma "mãozinha" se a função for clicável.
            backgroundColor: isOccupied ? '#FCC98A' : '#E4F7FE', // Laranja para ocupado, azul para vago
            fontWeight: isOccupied ? 'bold' : 'normal',
        };

        const handleClick = () => {
            // Se uma função onSeatSelect foi passada como prop, a executa.
            if (onSeatSelect) {
                // Passa o número da poltrona e os dados do passageiro (ou null se estiver vago).
                onSeatSelect(seat.number, passageiroNaPoltrona);
            }
        };

        return (
            <div key={seat.number} style={style} onClick={handleClick}>
                {seat.number}
            </div>
        );
    };

    // Renderização principal do componente
    return (
        <div style={{ border: '2px solid #333', padding: '10px', borderRadius: '5px' }}>
            <h4>Frente do Ônibus</h4>
            {generateSeats().map((row, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* Lado Esquerdo */}
                    <div style={{ display: 'flex' }}>
                        {row.filter(s => s.side === 'left').map(renderSeat)}
                    </div>

                    {/* Corredor */}
                    <div style={{ width: '50px' }}></div>

                    {/* Lado Direito */}
                    <div style={{ display: 'flex' }}>
                        {row.filter(s => s.side === 'right').map(renderSeat)}
                    </div>
                </div>
            ))}
        </div>
    );
}