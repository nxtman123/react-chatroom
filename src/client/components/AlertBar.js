import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";

const styles = theme => ({
    highlight: {
        color: theme.palette.secondary.main,
    }
});

const AlertBar = (props) => {
    const { classes, alertMessage, closeAlert } = props;
    return (
        <Snackbar
            open={alertMessage !== null}
            onClose={closeAlert}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            anchorOrigin={{ vertical: "top", horizontal: "center"}}
            message={alertMessage === null ? null : (
                <span>
                    {alertMessage[0]}
                    <span className={classes.highlight}>
                        {alertMessage[1]}
                    </span>
                    {alertMessage[2]}
                </span>
            )}
        />
    );
}

export default withStyles(styles)(AlertBar);
