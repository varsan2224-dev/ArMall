import {
  LuShoppingCart,
  LuTrash2,
  LuX,
  LuLock,
  LuCircleAlert,
  LuCircleCheck,
  LuArrowLeft,
} from "react-icons/lu";
import StarRating from "./products/StarRating";
import { useCart } from "../customHooks/useCart";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const shipping = totalPrice >= 100 || cartItems.length === 0 ? 0 : 4.99;
  const grandTotal = totalPrice + shipping;
  const hasOutOfStock = cartItems.some((i) => !i.inStock);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060b14] px-6 py-10 font-sans">
      <button
        onClick={() => navigate(-1)}
        className="group relative z-20 mb-8 inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-5 py-3 text-sm font-bold text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-200 hover:shadow-[0_0_35px_rgba(34,211,238,0.18)] active:scale-95"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/20">
          <LuArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </span>
        <span className="tracking-wide">Back</span>
      </button>
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cyan-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-16 -right-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div className="flex items-center gap-3 text-lg font-bold tracking-wide text-slate-100">
            <LuShoppingCart className="text-cyan-400" size={22} />
            Your Cart
            <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-0.5 text-xs font-bold text-cyan-400">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </span>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 rounded-xl border border-red-400/20 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-red-400 transition hover:border-red-400/40 hover:bg-red-400/10"
            >
              <LuTrash2 size={13} /> Clear all
            </button>
          )}
        </div>

        {cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-400/15 bg-cyan-400/[0.02] py-20 text-center">
            <LuShoppingCart size={48} className="mb-4 text-cyan-400/20" />
            <p className="font-bold text-slate-500">Cart is empty</p>
            <p className="mt-1 text-sm text-slate-600">
              Add some products to get started
            </p>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mb-6 flex flex-col gap-3">
            {cartItems.map((item) => {
              const lineTotal = (item.price * item.quantity).toFixed(2);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-cyan-400/[0.12] bg-[#0f1e3a]/70 p-4 backdrop-blur-xl transition hover:border-cyan-400/30 hover:shadow-[0_0_24px_rgba(34,211,238,0.06)]"
                >
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-cyan-400/15 bg-gradient-to-br from-slate-950 to-[#1e3a5f]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_60%)]" />
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="relative z-10 h-12 w-12 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {item.brand}
                    </p>
                    <p className="mb-1 truncate text-sm font-bold text-slate-100">
                      {item.title}
                    </p>
                    <StarRating rating={item.rating} />
                    <div
                      className={`mt-1 flex items-center gap-1 text-[11px] font-semibold ${item.inStock ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {item.inStock ? (
                        <>
                          <LuCircleCheck size={11} /> In Stock
                        </>
                      ) : (
                        <>
                          <LuCircleAlert size={11} /> Out of Stock
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2.5">
                    <span className="text-lg font-extrabold tracking-tight text-cyan-400">
                      ${lineTotal}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-sm font-bold text-cyan-400 transition hover:bg-cyan-400/20 active:scale-90"
                      >
                        -
                      </button>
                      <span className="min-w-[22px] text-center text-sm font-bold text-slate-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-sm font-bold text-cyan-400 transition hover:bg-cyan-400/20 active:scale-90"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-400/10 hover:text-red-400"
                      >
                        <LuX size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="rounded-2xl border border-cyan-400/[0.12] bg-[#0f1e3a]/60 p-5 backdrop-blur-xl">
            <div className="flex justify-between py-1 text-sm text-slate-500">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-sm text-slate-500">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="font-bold text-emerald-400">Free</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            {shipping > 0 && (
              <p className="pb-1 text-[11px] text-slate-600">
                Add ${(100 - totalPrice).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="mt-3 flex justify-between border-t border-white/[0.07] pt-4">
              <span className="text-base font-bold text-slate-100">Total</span>
              <span className="text-2xl font-extrabold tracking-tight text-cyan-400">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
            <button
              disabled={hasOutOfStock}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3 text-sm font-extrabold uppercase tracking-widest text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.2)] transition hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-cyan-400/20 disabled:text-cyan-400/40 disabled:shadow-none"
            >
              <LuLock size={15} /> Secure Checkout
            </button>
            {hasOutOfStock && (
              <p className="mt-2 text-center text-[11px] text-red-400">
                Remove out-of-stock items to continue
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
