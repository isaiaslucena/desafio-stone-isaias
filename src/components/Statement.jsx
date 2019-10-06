import React from 'react';

export default function Statement(props, ref) {
  return(
    <div>
        {props.state.statement.map((sts, idsts) => (
          <ul key={idsts}>
            <span>Date {sts.date}:</span>
            {sts.log.map((lg, idlg) => (
              <li key={idlg}>
                <span>{lg.time} - {lg.operation} {new Intl.NumberFormat('pt-BR').format(lg.amount)} {lg.currency}</span>
              </li>
            ))}
          </ul>
        ))}
    </div>
  )
}