import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  liItem: {
    paddingLeft: 30
  }
}));

export default function Statement(props, ref) {
  const classes = useStyles();

  return(
    <List className={classes.root} subheader={<li />}>
      {props.state.statement.sort(function(a, b) {
        return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
      }).map((sts,idsts) => (
        <li key={idsts} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{sts.date}</ListSubheader>
            {sts.log.map((lg,idlg) => (
              <ListItem key={idlg} className={classes.liItem}>
                <ListItemText primary={`${lg.time} - ${lg.operation} ${new Intl.NumberFormat("pt-BR").format(lg.amount)} ${lg.currency}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  )
}