import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            _focus: { borderColor: "orange.200" },
            borderColor: "transparent" // 默认不显示边框
          },
        },
      },
    },
  },
})

export default theme;