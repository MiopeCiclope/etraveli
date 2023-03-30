import React from 'react'
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
  onChange: () => void;
}

/**
 * SearchBar for any kind of list filtering
 */
export const SearchBar = (props: SearchBarProps) => {
  return (
    <SearchBarWrapper value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
  )
}
