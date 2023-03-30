import React, { ChangeEvent, useState } from 'react'
import { SearchBarWrapper } from './styles'

export interface SearchBarProps {
  /**
   * Search string
   */
  value?: string;
  /**
   * Placeholder when value empty
   */
  placeholder: string;
  /**
   * On change handler
   */
  onChange: (event?: ChangeEvent<HTMLInputElement>) => void
}

/**
 * SearchBar for list filtering
 */
export const SearchBar = (props: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(props.value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    props.onChange(event);
  };

  return (
    <SearchBarWrapper value={inputValue} placeholder={props.placeholder} onChange={handleInputChange} />
  )
}
