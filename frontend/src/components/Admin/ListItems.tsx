import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import { Fragment } from 'react';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { menuActions } from '../../store/menu-slice';
import { memo } from 'react';
import { useAppSelector } from '../../hooks/use-redux';

type DashboardProps = {
  list: lists[]
}
const ListItems = (props: DashboardProps): JSX.Element => {
  const dispatch = useDispatch()

  const onClickHandler = (event: React.MouseEvent<HTMLElement>, text: string) => {
    event.preventDefault()
    dispatch(menuActions.addOption(text))
    // dispatch(menuActions.addOption({ option: text }));
  }

  const selectedOption = useAppSelector((state) => state.menu.option);

  const itens = (list: string[]) =>
    list.map((option: string, index: number) => (
      <ListItemButton
        key={index.toString()}
        onClick={(e) => onClickHandler(e, option)}
        selected={selectedOption != list[index]}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={option} />
      </ListItemButton>
    ))

  return (
    <Fragment>
      {props.list.map((item: lists) => (
        <div key={item.id}>
          <Divider />
          <ListSubheader component="div" inset>
            {item.subheader}
          </ListSubheader>
          {itens(item.list)}
        </div>
      ))}
    </Fragment>
  )
}

export default memo(ListItems)
