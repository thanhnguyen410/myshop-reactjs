import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { path } from 'src/constants/path'
import { purchasesStatus } from 'src/constants/status'
import useQuery from 'src/hooks/useQuery'
import { formatMoney, generateNameId } from 'src/utils/helper'
import { getPurchases } from '../use.slice'
import * as S from './purchase.style'
export default function Purchase() {
  const dispatch = useDispatch()

  const [purchases, setPurchase] = useState([])
  const query = useQuery()
  const status = query.status || purchasesStatus.all

  useEffect(() => {
    dispatch(getPurchases(status))
      .then(unwrapResult)
      .then(purchases => {
        setPurchase(purchases.data || [])
      })
  }, [dispatch, status])

  const handleActive = value => {
    if (Number(value) === Number(status)) {
      return 'active'
    }
    return ''
  }

  return (
    <div>
      <title>Đơn mua</title>
      <S.PurchaseTabs>
        <S.PurchaseTabItem
          to={`${path.purchase}?status=${purchasesStatus.all}`}
          className={handleActive(purchasesStatus.all)}
        >
          Tất cả
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={`${path.purchase}?status=${purchasesStatus.waitForConfirmation}`}
          className={handleActive(purchasesStatus.waitForConfirmation)}
        >
          Chờ xác nhận
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={`${path.purchase}?status=${purchasesStatus.waitForGetting}`}
          className={handleActive(purchasesStatus.waitForGetting)}
        >
          Chờ lấy hàng
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={`${path.purchase}?status=${purchasesStatus.inProgress}`}
          className={handleActive(purchasesStatus.inProgress)}
        >
          Đang giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={`${path.purchase}?status=${purchasesStatus.delivered}`}
          className={handleActive(purchasesStatus.delivered)}
        >
          Đã giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={`${path.purchase}?status=${purchasesStatus.cancelled}`}
          className={handleActive(purchasesStatus.cancelled)}
        >
          Đã hủy
        </S.PurchaseTabItem>
      </S.PurchaseTabs>
      <S.PurchaseList>
        {purchases &&
          purchases.map((item, index) => (
            <S.OrderCard key={index}>
              <S.OrderCardContent>
                <S.OrderCardDetail>
                  <img src={item.product.image} alt="" />
                  <S.OrderContent>
                    <S.OrderName>{item.product.name}</S.OrderName>
                    <S.OrderQuantity>x {item.buy_count}</S.OrderQuantity>
                  </S.OrderContent>
                </S.OrderCardDetail>
                <S.OrderCardPrice>đ {formatMoney(item.product.price)}</S.OrderCardPrice>
              </S.OrderCardContent>
              <S.OrderCardButtonsContainer>
                <S.PurchaseButton to={path.product + `/${generateNameId(item.product)}`} light={1}>
                  Xem sản phẩm
                </S.PurchaseButton>
                <S.TotalPrice>
                  <S.TotalPriceLabel>Tổng giá tiền</S.TotalPriceLabel>
                  <S.TotalPricePrice>đ {formatMoney(item.price)}</S.TotalPricePrice>
                </S.TotalPrice>
              </S.OrderCardButtonsContainer>
            </S.OrderCard>
          ))}
      </S.PurchaseList>
    </div>
  )
}
