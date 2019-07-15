// translate router.meta.title, be used in breadcrumb sidebar tagsview
// translate router.meta.title, 在breadcrumb侧边栏tagsView中使用
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    // $T:vue-i18n中的这个方法，注入@/lang/index.js
    const translatedTitle = this.$t('route.' + title)

    return translatedTitle
  }
  return title
}
