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

type lists = {
    subheader: string,
    list: string[]
}

const ListItems = (props: any): JSX.Element => {

    const dispatch = useDispatch();

    const onClickHandler = (event: any) => {
        event.preventDefault();
        dispatch(menuActions.addOption({ option:event.target.textContent}));
    }

    const itens = (list: string[]) => (list.map((option: string, index: number) => (
        <ListItemButton key={index.toString()}
            onClick={onClickHandler}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={option} />
        </ListItemButton>
    )))

    return (<Fragment>
        {props.list.map((item: lists, index:number) => (
            <div key={index}><Divider sx={{ my: 1 }}/>
                <ListSubheader component="div" inset>
                    {item.subheader}
                </ListSubheader>
                {itens(item.list)}
            </div>
        ))}</Fragment>);
}

export default ListItems;
