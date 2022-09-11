import logo from './logo.svg';
import './App.css';
import { Container, Select, Box, MenuItem, TextField, Button, Typography, InputLabel, FormControl } from '@mui/material';
import { useState } from 'react';

const valuesData = [
  { 
    id: "1",
    caption: "Метр",
    captionMany: ["Метр","Метра", "Метров"],
    value: 1,
  },
  {
    id: "2",
    caption: "Сантиметр",
    captionMany: ["Сантиметр","Сантиметра", "Сантиметров"],
    value: 0.01,
  },
  {
    id: "222",
    caption: "Сантиметр",
    captionMany: ["Сантиметр","Сантиметра", "Сантиметров"],
    value: 0.01,
  },
  {
    id: "3",
    caption: "Миля",
    captionMany: ["Миля", "Мили", "Миль"],
    value: 1609.34
  },
  {
    id: "4",
    caption: "Верста",
    captionMany: ["Верста", "Версты", "Верст"],
    value: 1066.8
  },
  {
    id: "5",
    caption: "Аршин",
    captionMany: ["Аршин", "Аршина", "Аршинов"],
    value: 0.7112
  },
  {
    id: "6",
    caption: "Дюйм",
    captionMany: ["Дюйм", "Дюйма", "Дюймов"],
    value: 0.0254
  },
  // здесь ошибка должно быть 0.9144
  {
    id: "7",
    caption: "Ярд",
    captionMany: ["Ярд", "Ярда", "Ярдов"],
    value: 0.5144
  },
  {
    id: "8",
    caption: "Фарлонг",
    captionMany: ["Фарлонг", "Фарлонга", "Фарлонгов"],
    value: 201
  },
]

const getReadableValue = (count, [a, b, c]) => {
  const count100 = Math.floor(Math.abs(count) % 100)
  const count10 = Math.floor(Math.abs(count) % 10)
  if (count10 === 1 && count100 !== 11) {
    return a
  }
  if (count10 >= 2 && count10 <= 4) {
    return b
  }
  return c

}

const valueMap = valuesData.reduce((acc, item) => {
  return {
    ...acc,
    [item.id]: item
  }
}, {})

function App() {
  const [valueFrom, setValueFrom] = useState("")
  const [valueTo, setValueTo] = useState("")
  const [result, setResult] = useState("")
  const onChangeFrom = (e) => setValueFrom(e.target.value)
  const onChangeTo = (e) => setValueTo(e.target.value)
  const [fields, setFields] = useState({ from: "" })
  const onChangeFields = (e) => {
    setFields((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const onConfirm = () => {
    if (!valueTo || !valueFrom) {
      return
    }
    const from = parseFloat(fields.from)
    if (isNaN(from)) {
      return
    }

    const ratio = valueMap[valueFrom].value / valueMap[valueTo].value
    const to = ratio * from
    setResult(`${to} ${getReadableValue(to, valueMap[valueTo].captionMany)}`)
  }




  return (
    <Container maxWidth="xs" sx={{alignItems: "center", display: "flex", flexDirection: "column"}}>
      <Typography sx={{fontSize: "24px", mb: "30px"}}>Конветер величин</Typography>
      <Box>
        <Box sx={{ display: "flex" }}>
          <FormControl>
            <InputLabel id="select-from">Из</InputLabel>
            <Select
              labelId="select-from"
              name="select-from"
              data-testid="select-from"
              value={valueFrom}
              sx={{ minWidth: "200px" }}
              color="primary"
              label="Из"
              onChange={onChangeFrom}
            >
              {valuesData.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>{item.caption}</MenuItem>
                  )
                })}
            </Select>
          </FormControl>
          <TextField name="from" value={fields.from} onChange={onChangeFields} placeholder="Введите значение"  />
        </Box>
        <Box sx={{ display: "flex", mt: "12px" }}>
          <FormControl>
            <InputLabel id="select-to">В</InputLabel>
            <Select
              labelId="select-to"
              name="select-to"
              value={valueTo}
              data-testid="select-to"
              sx={{ minWidth: "200px" }}
              color="primary"
              label="В"
              onChange={onChangeTo}
            >
              {valuesData.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>{item.caption}</MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Button onClick={onConfirm} variant="contained" sx={{mt: "16px"}}>Применить</Button>
      <Box onClick={onConfirm} sx={{mt: "12px", alignSelf: "flex-start"}}>Результат: <Box component="span" sx={{textDecoration: "underline"}}>{result}</Box></Box>
    </Container>
  );
}

export default App;
