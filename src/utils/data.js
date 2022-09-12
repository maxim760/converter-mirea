const GroupsMap = {
  CI: "СИ",
  Americ: "Американская",
  Old: "Древнерусская"
}

const valuesData = [
  { 
    id: "1",
    caption: "Метр",
    captionMany: ["Метр","Метра", "Метров"],
    value: 1,
    group: GroupsMap.CI
  },
  {
    id: "2",
    caption: "Сантиметр",
    captionMany: ["Сантиметр","Сантиметра", "Сантиметров"],
    value: 0.01,
    group: GroupsMap.CI
  },
  {
    id: "222",
    caption: "Сантиметр",
    captionMany: ["Сантиметр","Сантиметра", "Сантиметров"],
    value: 0.01,
    group: GroupsMap.CI

  },
  {
    id: "3",
    caption: "Миля",
    captionMany: ["Миля", "Мили", "Миль"],
    value: 1609.34,
    group: GroupsMap.Americ
  },
  {
    id: "4",
    caption: "Верста",
    captionMany: ["Верста", "Версты", "Верст"],
    value: 1066.8,
    group: GroupsMap.Old
  },
  {
    id: "5",
    caption: "Аршин",
    captionMany: ["Аршин", "Аршина", "Аршинов"],
    value: 0.7112,
    group: GroupsMap.Old
  },
  {
    id: "6",
    caption: "Дюйм",
    captionMany: ["Дюйм", "Дюйма", "Дюймов"],
    value: 0.0254,
    group: GroupsMap.Americ
  },
  // здесь ошибка должно быть 0.9144
  {
    id: "7",
    caption: "Ярд",
    captionMany: ["Ярд", "Ярда", "Ярдов"],
    value: 0.5144,
    group: GroupsMap.Americ
  },
  {
    id: "8",
    caption: "Фарлонг",
    captionMany: ["Фарлонг", "Фарлонга", "Фарлонгов"],
    value: 201,
    group: GroupsMap.Americ
  },
]

export const valuesByGroups = Object
  .entries(
    valuesData.reduce((acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = []
      }
      acc[item.group].push(item)
      return acc
    }, [])
  )
  .map(([key, value]) => ({ group: key, nested: value }))

export const valueMap = valuesData.reduce((acc, item) => {
  return {
    ...acc,
    [item.id]: item
  }
}, {})