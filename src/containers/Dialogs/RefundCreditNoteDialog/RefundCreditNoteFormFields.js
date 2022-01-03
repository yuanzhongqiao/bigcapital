import React from 'react';
import intl from 'react-intl-universal';
import { FastField, ErrorMessage } from 'formik';
import {
  Classes,
  FormGroup,
  InputGroup,
  TextArea,
  Position,
  ControlGroup,
} from '@blueprintjs/core';
import classNames from 'classnames';
import { CLASSES } from 'common/classes';
import { DateInput } from '@blueprintjs/datetime';
import {
  Icon,
  FieldRequiredHint,
  AccountsSuggestField,
  InputPrependText,
  MoneyInputGroup,
  FormattedMessage as T,
} from 'components';
import {
  inputIntent,
  momentFormatter,
  tansformDateValue,
  handleDateChange,
} from 'utils';
import { useAutofocus } from 'hooks';
import { ACCOUNT_TYPE } from 'common/accountTypes';
import { useRefundCreditNoteContext } from './RefundCreditNoteFormProvider';

/**
 * Refund credit note form fields.
 */
function RefundCreditNoteFormFields() {
  const { accounts } = useRefundCreditNoteContext();
  const amountFieldRef = useAutofocus();
  return (
    <div className={Classes.DIALOG_BODY}>
      {/* ------------- Refund date ------------- */}
      <FastField name={'date'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'refund_credit_note.dialog.refund_date'} />}
            labelInfo={<FieldRequiredHint />}
            className={classNames('form-group--select-list', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="date" />}
            // inline={true}
          >
            <DateInput
              {...momentFormatter('YYYY/MM/DD')}
              value={tansformDateValue(value)}
              onChange={handleDateChange((formattedDate) => {
                form.setFieldValue('date', formattedDate);
              })}
              popoverProps={{ position: Position.BOTTOM, minimal: true }}
              inputProps={{
                leftIcon: <Icon icon={'date-range'} />,
              }}
            />
          </FormGroup>
        )}
      </FastField>
      {/* ------------- Amount ------------- */}
      <FastField name={'amount'}>
        {({
          form: { values, setFieldValue },
          field: { value },
          meta: { error, touched },
        }) => (
          <FormGroup
            label={<T id={'refund_credit_note.dialog.amount'} />}
            labelInfo={<FieldRequiredHint />}
            className={classNames('form-group--amount', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="amount" />}
            // inline={true}
          >
            <ControlGroup>
              <InputPrependText text={values.currency_code} />
              <MoneyInputGroup
                value={value}
                minimal={true}
                onChange={(amount) => {
                  setFieldValue('amount', amount);
                }}
                intent={inputIntent({ error, touched })}
                inputRef={(ref) => (amountFieldRef.current = ref)}
              />
            </ControlGroup>
          </FormGroup>
        )}
      </FastField>
      {/* ------------ Reference No. ------------ */}
      <FastField name={'reference_no'}>
        {({ form, field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'reference_no'} />}
            className={classNames('form-group--reference', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="reference" />}
            // inline={true}
          >
            <InputGroup
              intent={inputIntent({ error, touched })}
              minimal={true}
              {...field}
            />
          </FormGroup>
        )}
      </FastField>

      {/* ------------ Form account ------------ */}
      <FastField name={'from_account_id'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'refund_credit_note.dialog.from_account'} />}
            className={classNames(
              'form-group--from_account_id',
              'form-group--select-list',
              CLASSES.FILL,
            )}
            labelInfo={<FieldRequiredHint />}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name={'from_account_id'} />}
            // inline={true}
          >
            <AccountsSuggestField
              selectedAccountId={value}
              accounts={accounts}
              onAccountSelected={({ id }) =>
                form.setFieldValue('from_account_id', id)
              }
              inputProps={{
                placeholder: intl.get('select_account'),
              }}
              filterByTypes={[
                ACCOUNT_TYPE.BANK,
                ACCOUNT_TYPE.CASH,
                ACCOUNT_TYPE.FIXED_ASSET,
              ]}
            />
          </FormGroup>
        )}
      </FastField>
      {/* --------- Statement --------- */}
      <FastField name={'description'}>
        {({ form, field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'refund_credit_note.dialog.description'} />}
            className={'form-group--description'}
            // inline={true}
          >
            <TextArea growVertically={true} {...field} />
          </FormGroup>
        )}
      </FastField>
    </div>
  );
}

export default RefundCreditNoteFormFields;
