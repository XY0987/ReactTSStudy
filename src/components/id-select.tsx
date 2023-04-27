import React from 'react'

import { Select } from 'antd'
import { Raw } from 'types'

type SelectProps = React.ComponentProps<typeof Select>
interface IdSelectProps extends Omit<SelectProps, 'options' | 'value' | 'onChange'> {
  value: Raw | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}

/* 
value可以传入多种类型的值
onChange只会回调number|undefined类型
当isNaN(Numver(value))为true的时候代表选择默认类型
当选择默认类型的时候,onChange会回调undefined
*/

export const IdSellect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
      {options?.map((option) => {
        return (
          <Select.Option value={option.id} key={option.id}>
            {option.name}
          </Select.Option>
        )
      })}
    </Select>
  )
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
