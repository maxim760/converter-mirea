import { Container, Select, Box, MenuItem, TextField, Button, Typography, InputLabel, FormControl, ListSubheader } from '@mui/material';
import React, { useMemo, useState } from 'react';
import {valueMap, valuesWithGroups} from "./utils/data"
import {getReadableCaption, getToValue} from "./utils/functions"

const invalidChars = [
  "-",
  "+",
  "e",
];

function App() {
  const [valueFrom, setValueFrom] = useState("")
  const [valueTo, setValueTo] = useState("")
  const [result, setResult] = useState("")
  const onChangeFrom = (e) => setValueFrom(e.target.value)
  const onChangeTo = (e) => setValueTo(e.target.value)
  const [fields, setFields] = useState({ from: "" })
  const optionsInSelect = useMemo(() => {
    return valuesWithGroups.map(({ isGroup, group, id, caption }) => {
      if (isGroup) {
        return (
          <ListSubheader key={`group_${group}`} sx={{
            height: "24px",
            lineHeight: "24px",
            fontSize: "13px",
            display: "flex",
            borderBottom: t => `1px solid ${t.palette.divider}`,
            borderTop: t => `1px solid ${t.palette.divider}`,
          }}>
            {group}
          </ListSubheader>
        )
      }
      return (
        <MenuItem
          key={`item_${id}`}
          sx={{ pl: 3.6, height: "28px", fontSize: "16px" }}
          value={id}
        >{caption}</MenuItem>
      )
    })
  }, [])
  const onChangeFields = (e) => {
    setFields((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const onKeyDownNumber = (e) => {
    if(invalidChars.includes(e.key?.toLowerCase())) {
      e.preventDefault()
    }
  }
  const onConfirm = () => {
    if (!valueTo || !valueFrom) {
      return
    }
    const from = parseFloat(fields.from)
    if (isNaN(from)) {
      return
    }
    const to = getToValue(from, valueMap[valueFrom].value, valueMap[valueTo].value)
    setResult(`${to} ${getReadableCaption(to, valueMap[valueTo].captionMany)}`)
  }

  return (
    <Container maxWidth="xs" sx={{alignItems: "center", display: "flex", flexDirection: "column"}}>
      <Typography sx={{fontSize: "24px", mb: "30px"}}>Конвертер величин</Typography>
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
              {optionsInSelect}
            </Select>
          </FormControl>
          <TextField
            name="from"
            value={fields.from}
            onChange={onChangeFields}
            placeholder="Введите значение"
            onKeyDown={onKeyDownNumber}
            inputProps={{ inputMode: 'decimal' }}
            type="number"
          />
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
              {optionsInSelect}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Button onClick={onConfirm} variant="contained" sx={{mt: "16px"}}>Применить</Button>
      <Box onClick={onConfirm} sx={{mt: "12px", alignSelf: "flex-start"}}>Результат: <Box component="span" sx={{textDecoration: "underline", textTransform: "lowercase"}}>{result}</Box></Box>
    </Container>
  );
}

export default App;
