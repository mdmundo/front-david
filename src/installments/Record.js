import { forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Record = ({ open, setOpen, url }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Transition}
    >
      <DialogTitle>Comprovante</DialogTitle>
      <DialogContent>
        <Card>
          <CardMedia src={url} component="img" />
        </Card>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

export { Record as default };
