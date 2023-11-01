import { extendTheme } from "@chakra-ui/react"

import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    // border: '1px solid',
    // borderRadius: '12px', // change the border radius
    borderColor: '#F0A484', // change the border color
  },
})

export const radioTheme = defineMultiStyleConfig({ baseStyle })

const theme = extendTheme({
  components: {
    // Radio: radioTheme,
    // Input: {
    //   variants: {
    //     outline: {
    //       field: {
    //         _focus: { 
    //           borderColor: "orange.200",
    //           backgroundColor: "white" // 当获得焦点时，背景颜色变为白色
    //         },
    //         borderColor: "transparent" // 默认不显示边框
    //       },
    //     },
    //   },
    // }
  }
})

export default theme;