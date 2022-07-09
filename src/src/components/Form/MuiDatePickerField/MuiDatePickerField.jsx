import PropTypes from 'prop-types;';
import dayjs from 'dayjs';
import ruLocale from 'dayjs/locale/ru';
import { Controller, useFormContext } from 'react-hook-form';
import { AdapterDayjs, DatePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@mui/material';
import { InsertInvitation } from '@mui/icons-material';

export const MuiDatePickerField = ({ name, rules, label, mask, format }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={null}
      render={({ field: { onChange, ...field }, fieldState: { invalid, error } }) => (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          locale={ruLocale}
        >
          <DatePicker
            {...field}
            // views={ views }
            // openTo={ openTo }
            clearable={false}
            clearText='Сброс'
            cancelText='Отмена'
            okText='Выбрать'
            todayText='Сегодня'
            autoOk
            onChangeRaw={(e) => e.preventDefault()}
            inputFormat={format}
            // disabled={disabled}
            // disableToolbar={disableToolbar}
            variant='inline'
            mask={mask}
            inputVariant='outlined'
            value={field?.value ? dayjs(field?.value) : null}
            onChange={(value) => onChange(dayjs(value).format(format))}
            // name={name}
            label={label}
            disableMaskedInput={true}
            showTodayButton={true}
            renderInput={(params) => (
              <TextField
                // inputRef={ref}
                fullWidth
                sx={{ minWidth: 240 }}
                // size={smallField ? 'small' : 'medium'}
                {...params}
                error={invalid}
                helperText={error?.message || ''}
              />
            )}
            inputProps={{
              placeholder: format,
              readOnly: true,
              disabled: true,
            }}
            InputProps={{
              endAdornment: <InsertInvitation />,
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

MuiDatePickerField.defaultProps = {
  mask: '____-__-__',
  format: 'YYYY-MM-DD',
};

MuiDatePickerField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  mask: PropTypes.string,
  format: PropTypes.string,
};
