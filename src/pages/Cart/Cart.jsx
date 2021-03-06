import { createNextState, unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import CheckBox from 'src/components/CheckBox/CheckBox'
import ProductQuantityController from 'src/components/ProductQuantityController/ProductQuantityController.jsx'
import { formatMoney } from 'src/utils/helper.js'
import { buyPurchases, deletePurchase, getCartPurchases, updatePurchase } from './cart.slice.js'
import * as S from './cart.style.js'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'

export default function Cart() {
  const purchases = useSelector(state => state.cart.purchases)

  const [localPurchases, setLocalPurchases] = useState(() =>
    createNextState(purchases, draft => {
      draft.forEach(purchases => {
        purchases.disabled = false
        purchases.checked = false
      })
    })
  )

  const dispath = useDispatch()

  const isCheckedAll = localPurchases.every(purchase => purchase.checked)
  const checkedPurchases = localPurchases.filter(purchase => purchase.checked)
  const totalCheckedPurchases = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)

  const totalCheckedPurchasesSavingPrice = checkedPurchases.reduce((result, current) => {
    return result + (current.product.price_before_discount - current.product.price) * current.buy_count
  }, 0)

  useEffect(() => {
    setLocalPurchases(localPurchases => {
      const localPurchaseObject = keyBy(localPurchases, '_id')
      return createNextState(purchases, draft => {
        draft.forEach(purchase => {
          purchase.disabled = false
          purchase.checked = Boolean(localPurchaseObject[purchase._id]?.checked)
        })
      })
    })
  }, [purchases])

  const handleInputQuantity = indexPurchases => value => {
    const newLocalPurchases = createNextState(localPurchases, draft => {
      draft[indexPurchases].buy_count = value
    })

    setLocalPurchases(newLocalPurchases)
  }

  const handleBlurQuantity = indexPurchase => async value => {
    console.log('value', value)
    const purchase = localPurchases[indexPurchase]

    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = true
      })
    )

    if (value > purchase.product.quantity) {
      toast.error('Qu?? s??? l?????ng c???a s???n ph???m')
      setLocalPurchases(localPurchases =>
        createNextState(localPurchases, draft => {
          draft[indexPurchase].buy_count = purchase.buy_count
        })
      )
    } else {
      await dispath(
        updatePurchase({
          product_id: purchase.product._id,
          buy_count: value
        })
      ).then(unwrapResult)
    }

    await dispath(getCartPurchases()).then(unwrapResult)

    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = false
      })
    )
  }

  const handleIncreaseAndDecrease = indexPurchase => async value => {
    const purchase = localPurchases[indexPurchase]
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = true
        draft[indexPurchase].buy_count = value
      })
    )
    await dispath(
      updatePurchase({
        product_id: purchase.product._id,
        buy_count: value
      })
    ).then(unwrapResult)

    await dispath(getCartPurchases()).then(unwrapResult)

    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = false
      })
    )
  }

  const handleCheck = indexPurchase => value => {
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].checked = value
      })
    )
  }

  const handleCheckAll = () => {
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft.forEach(purchase => {
          purchase.checked = !isCheckedAll
        })
      })
    )
  }

  const handleRemove = indexPurchase => async () => {
    const purchase_id = localPurchases[indexPurchase]._id
    await dispath(deletePurchase([purchase_id])).then(unwrapResult)
    await dispath(getCartPurchases()).then(unwrapResult)
    toast.success('X??a ????n th??nh c??ng', {
      position: 'top-center',
      autoClose: 3000
    })
  }

  const handleRemoveManyPurchases = async () => {
    const purchase_ids = checkedPurchases.map(purchase => purchase._id)
    await dispath(deletePurchase(purchase_ids)).then(unwrapResult)
    await dispath(getCartPurchases()).then(unwrapResult)
    toast.success('X??a ????n th??nh c??ng', {
      position: 'top-center',
      autoClose: 3000
    })
  }

  const handleBuyPurchases = async () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map(purchase => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))

      await dispath(buyPurchases(body)).then(unwrapResult)
      await dispath(getCartPurchases()).then(unwrapResult)
      toast.success('?????t ????n th??nh c??ng', {
        position: 'top-center',
        autoClose: 3000
      })
    }
  }

  return (
    <div className="container">
      <div>
        <S.ProductHeader>
          <S.ProductHeaderCheckbox>
            <CheckBox onChange={handleCheckAll} checked={isCheckedAll} />
          </S.ProductHeaderCheckbox>
          <S.ProductHeaderName>S???n ph???m</S.ProductHeaderName>
          <S.ProductHeaderUnitPrice>????n gi??</S.ProductHeaderUnitPrice>
          <S.ProductHeaderQuantity>S??? l?????ng</S.ProductHeaderQuantity>
          <S.ProductHeaderTotalPrice>S??? ti???n</S.ProductHeaderTotalPrice>
          <S.ProductHeaderAction>Thao t??c</S.ProductHeaderAction>
        </S.ProductHeader>
        <S.ProductSection>
          {localPurchases.map((purchases, index) => (
            <S.CartItem key={purchases._id}>
              <S.CartItemCheckbox>
                <CheckBox checked={purchases.checked} onChange={handleCheck(index)} />
              </S.CartItemCheckbox>
              <S.CartItemOverview>
                <S.CartItemOverviewImage to="">
                  <img src={purchases.product.image} alt="" />
                </S.CartItemOverviewImage>
                <S.CartItemOverviewNameWrapper>
                  <S.CartItemOverviewName to="">{purchases.product.name}</S.CartItemOverviewName>
                </S.CartItemOverviewNameWrapper>
              </S.CartItemOverview>
              <S.CartItemUnitPrice>
                <span>?? {formatMoney(purchases.product.price_before_discount)}</span>
                <span>?? {formatMoney(purchases.product.price)}</span>
              </S.CartItemUnitPrice>
              <S.CartItemQuantity>
                <ProductQuantityController
                  max={purchases.product.quantity}
                  value={purchases.buy_count}
                  disabled={purchases.disabled}
                  onInput={handleInputQuantity(index)}
                  onBlur={handleBlurQuantity(index)}
                  onIncrease={handleIncreaseAndDecrease(index)}
                  onDecrease={handleIncreaseAndDecrease(index)}
                />
              </S.CartItemQuantity>
              <S.CartItemTotalPrice>
                <span>?? {formatMoney(Number(purchases.product.price) * Number(purchases.buy_count))}</span>
              </S.CartItemTotalPrice>
              <S.CartItemAction>
                <S.CartItemActionButton onClick={handleRemove(index)}>X??a</S.CartItemActionButton>
              </S.CartItemAction>
            </S.CartItem>
          ))}
        </S.ProductSection>
      </div>
      <S.CartFooter>
        <S.CartFooterCheckbox>
          <CheckBox onChange={handleCheckAll} checked={isCheckedAll} />
        </S.CartFooterCheckbox>
        <S.CartFooterButton onClick={handleCheckAll}>Ch???n t???t c??? ({purchases.length})</S.CartFooterButton>
        <S.CartFooterButton onClick={handleRemoveManyPurchases}>X??a</S.CartFooterButton>
        <S.CartFooterSpaceBetween />
        <S.CartFooterPrice>
          <S.CartFooterPriceTop>
            <div>T???ng thanh to??n ({totalCheckedPurchases} s???n ph???m): </div>
            <div>?? {formatMoney(totalCheckedPurchasesPrice)}</div>
          </S.CartFooterPriceTop>
          <S.CartFooterPriceBot>
            <div>Ti???t ki???m</div>
            <div>?? {formatMoney(totalCheckedPurchasesSavingPrice)}</div>
          </S.CartFooterPriceBot>
        </S.CartFooterPrice>
        <S.CartFooterCheckout onClick={handleBuyPurchases}>Mua h??ng</S.CartFooterCheckout>
      </S.CartFooter>
    </div>
  )
}
