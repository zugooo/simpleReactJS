import React, { Component, useState } from 'react'
import {fade } from "../../node_modules_old/@material-ui/core/styles";
import {connect} from 'react-redux'
import {getFeed} from '../store/action'
import {withStyles, Paper} from '../../node_modules_old/@material-ui/core';
import AppBar from "../../node_modules_old/@material-ui/core/AppBar";
import Toolbar from "../../node_modules_old/@material-ui/core/Toolbar";
import Typography from "../../node_modules_old/@material-ui/core/Typography";
import blue from "../../node_modules_old/@material-ui/core/colors/blue";
import Icon from "../../node_modules_old/@material-ui/core/Icon";
import Grid from "../../node_modules_old/@material-ui/core/Grid";
import InputBase from '../../node_modules_old/@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '../../node_modules_old/@material-ui/core/Chip'
import moment from 'moment';

const useStyles = (theme) => ({
    root: props => ({
        flexGrow: 1,
    }),
    title: {
        flexGrow: 1
    },
    customColor: {
        // or hex code, this is normal CSS background-color
        backgroundColor: blue[500]
    },
    customHeight: {
        minHeight: 200
    },
    customWidth: {
        maxWidth: 500,
        position: 'absolute', left: '50%',
        transform: 'translate(-50%, 0%)'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2,),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
    paper: {
        position : 'absolute',
        zIndex   : 2,
        marginTop: theme.spacing(),
        left     : 0,
        right    : 0
    },
    chip: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(0.5),
        },
    },
    photo: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(0.5),
        },
    },
    offset: theme.mixins.toolbar
});

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
          example: "customColor"
        };
    }
    componentDidMount(){
        this.props.getFeed()
        
    }
    render() {
        const {feed} = this.props.feed
        const {classes} = this.props
        const {example} = this.state
        const isCustomColor = example === "customColor";
        const isCustomHeight = example === "customHeight";
        console.log(feed)
        
        return (
            <React.Fragment>
                <AppBar
                    color={isCustomColor || isCustomHeight ? "primary" : example}
                    className={`${isCustomColor && classes.customColor} ${isCustomHeight && classes.customHeight}`}
                >
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            AppBar
                        </Typography>
                        <Icon color="inherit">
                            <SearchIcon />
                        </Icon>
                        <InputBase 
                            placeholder="Search…" 
                            classes={{root: classes.inputRoot, input: classes.inputInput,}} 
                            inputProps={{ 'aria-label': 'search' }} 
                        />
                    </Toolbar>
                </AppBar>
                <Toolbar />
                <div className={classes.customWidth} display="block">
                    {feed.map(u => 
                        <Paper square elevation={3} key={u.id}>
                            <Typography variant="h6">
                                {u.title}
                            </Typography>
                            <Typography variant="subtitle1">
                                {u.author[0].name}
                            </Typography>
                            <div className={classes.photo}>
                                {u.content.length > 1 ? ( v =>
                                    <div dangerouslySetInnerHTML={{__html:u.content[v]._}}></div>
                                ) : (<div dangerouslySetInnerHTML={{__html:u.content[0]._}}></div>)}
                            </div>
                            <div className={classes.chip}>
                                {u.category && u.category.map((item, index) => (
                                    item.term.map((item2, index2) => (<Chip key={index2} label={item2}></Chip>))
                                ))}
                            </div>
                            <Typography variant="overline" display="block" gutterBottom>
                                {moment().startOf('hour').fromNow()}
                            </Typography>
                        </Paper>
                        
                    )}
                    </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps  = (state) => ({feed:state.feed})

export default connect(mapStateToProps, {getFeed})(withStyles(useStyles, { withTheme: true })(Feed));