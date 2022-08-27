import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  Box,
  Chip,
} from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    height: 240,
  },
});

const ProductItem = ({
  name,
  price,
  imgUrl,
  category,
  value, 
  index,
}: {
  name: string;
  price: number;
  imgUrl: string;
  category: string;
  value: number;
  index: number;
}) => {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      {value === index && (
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          src={imgUrl}
          title="product thumbnail"
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Chip label={category} />
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
      )}
    </Card>
  );
};

export default ProductItem;
