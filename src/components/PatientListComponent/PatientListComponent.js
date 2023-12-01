import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { CardActionArea, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./PatientListComponent.css";

const PatientListComponent = (props) => {
  const name = props.name.given[0] + " " + props.name.family;
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardActionArea
          className="cardContent"
          style={{ display: "flex", flexDirection: "row" }}
          onClick={handleClick}
        >
          <div className="cardContentProp" style={{ flex: 1 }}>
            <Typography sx={{ fontSize: 14 }}>{props.id}</Typography>
          </div>
          <div className="cardContentProp" style={{ flex: 1 }}>
            <Typography sx={{ fontSize: 14 }}>{name}</Typography>
          </div>
          <div className="cardContentProp" style={{ flex: 1 }}>
            <Typography sx={{ fontSize: 14 }}>{props.date}</Typography>
          </div>

          <div style={{ flex: 3, textAlign: "right", paddingRight: 10 }}>
            <ArrowForwardIcon fontSize="large" />
          </div>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default PatientListComponent;
