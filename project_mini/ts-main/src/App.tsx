import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { couldStartTrivia } from "typescript";
import { Category } from "./data";
import ProductItem from "./ProductItem";
import useFakeQuery from "./useFakeQuery";

const useStyles = makeStyles({
  container: {
    paddingTop: 56,
  },
});

function App() {
  const classes = useStyles();
  const { query, data } = useFakeQuery();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [filters, setFilters] = useState({
    list: 0,
    keyword: "",
    category: Category.All,
    maxPrice: 10000,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    query({ variables: filters });
    sessionStorage.setItem('item', JSON.stringify(filters));
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      <Box mb={7}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={2}>
            <TextField
              label="상품명"
              placeholder="상품명 검색"
              variant="outlined"
              name="keyword"
              value={filters.keyword}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="카테고리"
              variant="outlined"
              value={filters.category}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  category: event.target.value as Category,
                }))
              }
              select
              fullWidth
              size="small"
            >
              <MenuItem value={Category.Device}>Device</MenuItem>
              <MenuItem value={Category.Food}>Food</MenuItem>
              <MenuItem value={Category.Fashion}>Fashion</MenuItem>
              <MenuItem value={Category.All}>All</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="최대 가격"
              variant="outlined"
              value={filters.maxPrice}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: Number(event.target.value),
                }))
              }
              select
              fullWidth
              size="small"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
              <MenuItem value={10000}>10000</MenuItem>
            </TextField>
          </Grid>
          <Box display="flex" alignItems="center">
            <Button variant="contained" onClick={handleSubmit} fullWidth>
              Submit
            </Button>
          </Box>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <Paper variant="outlined">
          <Tabs
            value={tabIndex}
            onChange={(event, newValue) => {
              setTabIndex(newValue);
              setFilters((prev) => ({
                ...prev,
                list: newValue,
              }))
              }
            }
            aria-label="simple tabs example"
          >
            <Tab label="List 1" />
            <Tab label="List 2" />
            <Tab label="List 3" />
          </Tabs>
        </Paper>
      </Box>
      <Grid container spacing={5} justify="center">
        {/* 아래 라인은 렌더링 부하를 증가시키기 위해 의도한 코드이므로 수정하지 말아주세요 */}
        {[...new Array(10)].flatMap(() =>
          data.map(({ name, price, category }, i) => (
            <Grid item xs={4}>
              <ProductItem
                name={name}
                price={price}
                imgUrl={`https://picsum.photos/345/240?random=${i}`}
                category={category}
                value={tabIndex} 
                index={tabIndex}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default App;
