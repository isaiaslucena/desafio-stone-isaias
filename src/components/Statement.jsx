import React from 'react';

export default function Statement(props, ref) {
  return(
    <div>
        {props.state.statement.map((sts, idsts) => (
          <ul key={idsts}>
            <span>{sts.date}</span>
            {sts.log.map((lg, idlg) => (
              <li key={idlg}>
                <span>{lg.time}</span>
                <span>{lg.operation}</span>
                <span>{lg.currency}</span>
                <span>{lg.amount}</span>
              </li>
            ))}
          </ul>
        ))}
    </div>
  )
}