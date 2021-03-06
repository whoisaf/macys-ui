import React, { useEffect, useState } from 'react'
import {
  Box,
  Input,
  InputProps,
  InputAdornment,
  Button,
  IconButton
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { useStyles } from '../hooks'
import SearchIcon from '../icons/SearchIcon'
import ClearFilledIcon from '../icons/ClearFilledIcon'

export interface ISearchFieldProps extends InputProps {
  value: string | null
  action?: React.ReactNode | undefined
  onReset?(): void
  onClickCancel?(): void
}

/**
 * Wrapped Input with styling
 */
const StyledInput = styled(Input)<InputProps>(({ theme }) => ({
  backgroundColor: theme.palette.gray6.main,
  height: '40px',
  minWidth: '247px',
  borderRadius: '63px',
  padding: '0 4px 0 12px',
  transition: 'all .2s ease',
  // Remove border
  '&::before, &::after': {
    border: 'none !important'
  },
  // Hover state
  ':hover': {},
  // Focus state
  '&.Mui-focused': {},
  // Placeholder
  '& .MuiInput-input::placeholder': {
    opacity: 1,
    color: theme.palette.gray1.main
  },
  // Icon buttons
  '& .MuiIconButton-root': {
    transition: 'all .2s ease',
    ':hover': {
      backgroundColor: 'transparent',
      color: theme.palette.common.black
    }
  }
}))

/**
 * SearchField
 * @description custom searach field component that utilizes MUI Input component
 */
function SearchField({
  value,
  placeholder = 'Search',
  action,
  onReset,
  onChange,
  onClickCancel
}: ISearchFieldProps) {
  const [showReset, setShowReset] = useState<boolean>(false)
  const { buttonReset } = useStyles()

  /**
   * When value is updated ..
   */
  useEffect(() => {
    // Show reset button if value has any value
    if (value && value.length) {
      setShowReset(true)
    } else {
      setShowReset(false)
    }
  }, [value])

  /**
   * renderEndAdornment
   * @description conditially render different buttons at the end of the input field
   */
  const renderEndAdornment = () => {
    return (
      <InputAdornment position='end'>
        {showReset ? (
          <IconButton onClick={onReset}>
            <ClearFilledIcon />
          </IconButton>
        ) : (
          action && action
        )}
      </InputAdornment>
    )
  }

  return (
    <Box>
      <StyledInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={renderEndAdornment()}
      />
      {/* Cancel action (only renders if `onClickCancel` callback is provided) */}
      {onClickCancel && (
        <Button
          sx={{ ...buttonReset }}
          size='small'
          disableRipple
          disableFocusRipple
          onClick={onClickCancel}
        >
          Cancel
        </Button>
      )}
    </Box>
  )
}

export default SearchField
