// 方案12：极光梦境
// 设计理念：深色背景配合流动的极光色彩，玻璃拟态效果带来现代感和深度，适合夜间阅读体验
// 色彩方案：以深邃的夜空为背景，点缀蓝紫色极光渐变，辅以粉色和青色的点缀
// 排版：采用Inter字体，确保深色背景上的清晰度和可读性
// 交互：添加微妙的悬浮动画和过渡效果，提升用户体验

export const theme12 = {
    name: '极光梦境',
    colors: {
        primary: '#9333EA', // 主色调：紫色，代表神秘和梦幻
        background: '#0F172A', // 背景色：深蓝黑色，代表夜空
        text: {
            primary: '#F8FAFC', // 主文本：浅色，确保在深色背景上的可读性
            secondary: '#A78BFA', // 次要文本：紫色调，与主色调呼应
            meta: '#94A3B8', // 元数据：灰色调
            code: '#E9D5FF', // 代码块文本：浅紫色
            accent: '#EC4899' // 强调色：粉色，增加视觉亮点
        },
        nav: {
            inactive: 'rgba(248, 250, 252, 0.6)', // 导航非激活状态
            hover: 'rgba(248, 250, 252, 0.9)', // 导航悬停状态
            active: '#A78BFA', // 导航激活状态
            background: 'rgba(15, 23, 42, 0.8)', // 导航背景：半透明深色
            blur: '10px' // 导航模糊效果
        },
        card: {
            background: 'rgba(30, 41, 59, 0.7)', // 卡片背景：半透明深色
            hover: 'rgba(30, 41, 59, 0.9)', // 卡片悬停状态
            border: 'rgba(147, 51, 234, 0.1)', // 卡片边框：半透明紫色
            glow: '0 0 30px rgba(147, 51, 234, 0.15)' // 卡片发光效果
        },
        divider: 'rgba(147, 51, 234, 0.1)', // 分隔线：半透明紫色
        states: {
            hover: {
                primary: 'rgba(147, 51, 234, 0.8)', // 悬停主色
                text: '#F8FAFC', // 悬停文本色
                background: 'rgba(30, 41, 59, 0.9)' // 悬停背景色
            },
            active: {
                primary: '#9333EA', // 激活主色
                text: '#F8FAFC', // 激活文本色
                background: 'rgba(30, 41, 59, 1)' // 激活背景色
            },
            disabled: {
                primary: 'rgba(147, 51, 234, 0.3)', // 禁用主色
                text: 'rgba(248, 250, 252, 0.3)', // 禁用文本色
                background: 'rgba(30, 41, 59, 0.3)' // 禁用背景色
            }
        },
        social: {
            github: '#F8FAFC', // GitHub图标颜色
            twitter: '#3B82F6', // Twitter图标颜色
            facebook: '#1877F2', // Facebook图标颜色
            linkedin: '#0A66C2' // LinkedIn图标颜色
        },
        gradients: {
            primary: 'linear-gradient(135deg, #9333EA 0%, #EC4899 50%, #6366F1 100%)', // 主渐变：紫粉蓝
            background: {
                color: '#0F172A', // 背景色
                image: `linear-gradient(180deg, #0F172A 0%, #1E293B 100%),
                        radial-gradient(circle at 50% 0%, rgba(147, 51, 234, 0.15) 0%, transparent 70%),
                        radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 70%),
                        radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)`, // 背景渐变和光效
                repeat: 'no-repeat',
                position: 'center',
                size: 'cover'
            },
            card: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)', // 卡片渐变 - 透明度调整为0.7
            text: 'linear-gradient(90deg, #F8FAFC 0%, #A78BFA 100%)', // 文本渐变
            border: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)', // 边框渐变
            glow: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)' // 发光渐变
        },
        variants: {
            primaryLight: 'rgba(147, 51, 234, 0.1)', // 主色浅色变体
            primaryDark: 'rgba(147, 51, 234, 0.9)', // 主色深色变体
            textLight: 'rgba(248, 250, 252, 0.1)', // 文本浅色变体
            textDark: 'rgba(248, 250, 252, 0.9)', // 文本深色变体
            glass: 'rgba(30, 41, 59, 0.4)' // 玻璃拟态效果
        },
        semantic: {
            success: '#10B981', // 成功色
            warning: '#F59E0B', // 警告色
            error: '#EF4444', // 错误色
            info: '#3B82F6' // 信息色
        }
    },
    // 装饰元素配置
    decoration: {
        blur: 40,
        opacity: 0.7
    },
    spacing: {
        headerHeight: '64px', // 头部高度
        headerTop: '24px', // 头部顶部间距
        headerPadding: '0 24px', // 头部内边距
        contentWidth: '1140px', // 内容宽度
        contentPadding: '24px', // 内容内边距
        mainPaddingTop: '100px', // 主内容区顶部间距
        sidebarWidth: '300px', // 侧边栏宽度
        sidebarSpacing: '32px', // 侧边栏间距
        gap: {
            grid: '64px', // 网格间距
            articles: '32px', // 文章间距
            nav: '48px', // 导航间距
            meta: '16px', // 元数据间距
            social: '20px' // 社交图标间距
        },
        padding: {
            card: '28px 36px', // 卡片内边距
            sidebar: '28px', // 侧边栏内边距
            content: '24px', // 内容内边距
            nav: '16px 24px', // 导航内边距
            meta: '8px 16px' // 元数据内边距
        },
        margin: {
            sectionTitle: '32px', // 章节标题间距
            articleTitle: '16px', // 文章标题间距
            articleMeta: '12px', // 文章元数据间距
            articleDesc: '16px', // 文章描述间距
            sidebarSection: '32px', // 侧边栏章节间距
            categoryItem: '12px' // 分类项间距
        },
        sections: {
            aboutMarginBottom: '32px', // 关于部分底部间距
            categoriesMarginTop: '32px', // 分类部分顶部间距
            articleFooterSpacing: '24px' // 文章底部间距
        },
        divider: {
            margin: '32px 0', // 分隔线间距
            opacity: '0.1' // 分隔线透明度
        },
        base: {
            unit: '4px', // 基础单位
            scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100] // 间距比例
        },
        container: {
            maxWidth: '1140px', // 容器最大宽度
            padding: {
                desktop: '32px', // 桌面内边距
                tablet: '24px', // 平板内边距
                mobile: '16px' // 移动端内边距
            }
        },
        article: {
            spacing: {
                between: '40px', // 文章间间距
                meta: '12px', // 文章元数据间距
                title: '16px', // 文章标题间距
                description: '16px', // 文章描述间距
                footer: '20px' // 文章底部间距
            },
            padding: {
                desktop: '32px 40px', // 桌面文章内边距
                tablet: '24px 32px', // 平板文章内边距
                mobile: '20px 24px' // 移动端文章内边距
            }
        },
        sidebar: {
            spacing: {
                section: '32px', // 侧边栏章节间距
                item: '8px', // 侧边栏项间距
                title: '16px' // 侧边栏标题间距
            }
        },
        presets: {
            compact: {
                card: '16px', // 紧凑卡片间距
                container: '16px', // 紧凑容器间距
                section: '24px' // 紧凑章节间距
            },
            normal: {
                card: '24px', // 普通卡片间距
                container: '32px', // 普通容器间距
                section: '48px' // 普通章节间距
            },
            relaxed: {
                card: '32px', // 宽松卡片间距
                container: '48px', // 宽松容器间距
                section: '64px' // 宽松章节间距
            }
        }
    },
    typography: {
        logo: {
            size: '28px', // Logo大小
            weight: '700', // Logo字重
            spacing: '-0.02em', // Logo字符间距
            gradient: 'var(--theme-gradients-text)' // Logo渐变
        },
        nav: {
            size: '15px', // 导航字体大小
            spacing: '0.02em', // 导航字符间距
            weight: '500', // 导航字重
            transform: 'none' // 导航文字变换
        },
        title: {
            size: '32px', // 标题大小
            lineHeight: '1.3', // 标题行高
            weight: '700', // 标题字重
            spacing: '-0.01em', // 标题字符间距
            gradient: 'var(--theme-gradients-text)' // 标题渐变
        },
        sectionTitle: {
            size: '22px', // 章节标题大小
            weight: '600', // 章节标题字重
            spacing: '-0.02em', // 章节标题字符间距
            marginBottom: '24px', // 章节标题底部间距
            gradient: 'var(--theme-gradients-text)' // 章节标题渐变
        },
        meta: {
            size: '13px', // 元数据大小
            spacing: '0.02em', // 元数据字符间距
            weight: '400' // 元数据字重
        },
        description: {
            size: '16px', // 描述大小
            lineHeight: '1.7', // 描述行高
            spacing: '0.01em', // 描述字符间距
            weight: '400' // 描述字重
        },
        footer: {
            size: '14px', // 页脚大小
            spacing: '0.02em', // 页脚字符间距
            weight: '400' // 页脚字重
        },
        sidebar: {
            title: {
                size: '1.2rem', // 侧边栏标题大小
                weight: '600', // 侧边栏标题字重
                spacing: '0.01em' // 侧边栏标题字符间距
            },
            text: {
                size: '1rem', // 侧边栏文本大小
                lineHeight: '1.8', // 侧边栏文本行高
                spacing: '0.01em' // 侧边栏文本字符间距
            },
            category: {
                size: '1rem', // 侧边栏分类大小
                spacing: '0.01em' // 侧边栏分类字符间距
            },
            count: {
                size: '0.9rem', // 侧边栏计数大小
                lineHeight: '1.5' // 侧边栏计数字高
            },
            categories: {
                title: {},
                item: {
                    name: {}
                }
            }
        },
        link: {
            size: '16px', // 链接大小
            weight: '600', // 链接字重
            decoration: 'none', // 链接装饰
            hover: {
                color: '#A78BFA', // 链接悬停颜色
                decoration: 'none' // 链接悬停装饰
            }
        },
        article: {
            title: {
                size: '38px', // 文章标题大小
                lineHeight: '1.2', // 文章标题行高
                weight: '800', // 文章标题字重
                spacing: '-0.02em', // 文章标题字符间距
                decoration: 'none', // 文章标题装饰
                color: '#F8FAFC', // 文章标题颜色
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', // 文章标题阴影
                hover: {
                    transform: 'translateY(-3px)', // 文章标题悬停变换
                    decoration: 'none', // 文章标题悬停装饰
                    color: '#FFFFFF' // 文章标题悬停颜色
                }
            },
            meta: {
                size: '15px', // 文章元数据大小
                spacing: '0.03em', // 文章元数据字符间距
                weight: '500', // 文章元数据字重
                color: '#94A3B8', // 文章元数据颜色
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' // 文章元数据阴影
            },
            description: {
                size: '17px', // 文章描述大小
                lineHeight: '1.8', // 文章描述行高
                spacing: '0.02em', // 文章描述字符间距
                weight: '400', // 文章描述字重
                color: '#CBD5E1', // 文章描述颜色
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' // 文章描述阴影
            },
            category: {
                size: '15px', // 文章分类大小
                weight: '700', // 文章分类字重
                spacing: '0.03em', // 文章分类字符间距
                transform: 'none', // 文章分类变换
                gradient: 'var(--theme-gradients-text)', // 文章分类渐变
                hover: {
                    opacity: '0.9' // 文章分类悬停透明度
                }
            }
        },
        base: {
            family: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // 基础字体
            size: '17px', // 基础字体大小
            lineHeight: '1.8', // 基础行高
            weight: '400' // 基础字重
        },
        headings: {
            h1: {
                size: '36px', // H1大小
                lineHeight: '1.2', // H1行高
                weight: 'bold', // H1字重
                spacing: '-0.02em', // H1字符间距
                marginBottom: '24px' // H1底部间距
            },
            h2: {
                size: '28px', // H2大小
                lineHeight: '1.3', // H2行高
                weight: '600', // H2字重
                spacing: '-0.01em', // H2字符间距
                marginBottom: '20px' // H2底部间距
            },
            h3: {
                size: '22px', // H3大小
                lineHeight: '1.4', // H3行高
                weight: '600', // H3字重
                spacing: '-0.01em', // H3字符间距
                marginBottom: '16px' // H3底部间距
            }
        },
        variants: {
            mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', // 等宽字体
            serif: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif', // 衬线字体
            sans: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' // 无衬线字体
        },
        presets: {
            title: {
                large: {
                    size: '44px', // 大标题大小
                    lineHeight: '1.2', // 大标题行高
                    weight: '800', // 大标题字重
                    spacing: '-0.03em' // 大标题字符间距
                },
                medium: {
                    size: '36px', // 中标题大小
                    lineHeight: '1.3', // 中标题行高
                    weight: '700', // 中标题字重
                    spacing: '-0.02em' // 中标题字符间距
                },
                small: {
                    size: '28px', // 小标题大小
                    lineHeight: '1.4', // 小标题行高
                    weight: '600', // 小标题字重
                    spacing: '-0.01em' // 小标题字符间距
                }
            },
            text: {
                large: {
                    size: '20px', // 大文本大小
                    lineHeight: '1.6', // 大文本行高
                    weight: '400' // 大文本字重
                },
                medium: {
                    size: '17px', // 中文本大小
                    lineHeight: '1.6', // 中文本行高
                    weight: '400' // 中文本字重
                },
                small: {
                    size: '15px', // 小文本大小
                    lineHeight: '1.5', // 小文本行高
                    weight: '400' // 小文本字重
                },
                tiny: {
                    size: '13px', // 微型文本大小
                    lineHeight: '1.5', // 微型文本行高
                    weight: '400' // 微型文本字重
                }
            }
        }
    },
    borderRadius: {
        card: '16px', // 卡片圆角
        button: '12px', // 按钮圆角
        tag: '8px', // 标签圆角
        image: '12px', // 图片圆角
        input: '10px' // 输入框圆角
    },
    shadows: {
        card: '0 4px 20px rgba(0, 0, 0, 0.2), 0 8px 30px rgba(0, 0, 0, 0.1)', // 卡片阴影
        hover: '0 10px 30px rgba(0, 0, 0, 0.25), 0 15px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(147, 51, 234, 0.1)', // 悬停阴影
        dropdown: '0 4px 12px rgba(0, 0, 0, 0.3)', // 下拉菜单阴影
        button: '0 2px 8px rgba(147, 51, 234, 0.25)', // 按钮阴影
        focus: '0 0 0 3px rgba(147, 51, 234, 0.2)' // 焦点阴影
    },
    effects: {
        hover: {
            transform: {
                subtle: 'translateY(-2px)', // 微妙变换
                medium: 'translateY(-3px)', // 中等变换
                large: 'translateY(-4px)' // 大变换
            },
            shadow: {
                subtle: '0 4px 16px rgba(0, 0, 0, 0.15)', // 微妙阴影
                medium: '0 6px 24px rgba(0, 0, 0, 0.2)', // 中等阴影
                large: '0 8px 32px rgba(0, 0, 0, 0.25), 0 0 20px rgba(147, 51, 234, 0.1)' // 大阴影
            }
        },
        transition: {
            default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // 默认过渡
            smooth: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', // 平滑过渡
            bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' // 弹跳过渡
        }
    },
    motion: {
        duration: {
            instant: '0.1s', // 即时动画
            fast: '0.3s', // 快速动画
            normal: '0.4s', // 普通动画
            slow: '0.6s', // 慢速动画
            slower: '0.8s' // 更慢动画
        },
        easing: {
            linear: 'linear', // 线性动画
            ease: 'ease', // 缓动动画
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)', // 缓入动画
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)', // 缓出动画
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // 缓入缓出动画
            spring: 'cubic-bezier(0.155, 1.105, 0.295, 1.12)', // 弹簧动画
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' // 弹跳动画
        }
    },
    components: {
        card: {
            variants: {
                elevated: {
                    background: 'rgba(30, 41, 59, 0.7)', // 卡片背景 - 透明度调整为0.7
                    backdropFilter: 'blur(12px)', // 卡片模糊效果
                    border: '1px solid rgba(147, 51, 234, 0.15)', // 卡片边框
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // 卡片过渡
                    hover: {
                        transform: 'translateY(-4px)', // 卡片悬停变换
                        background: 'rgba(30, 41, 59, 0.8)', // 卡片悬停背景
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25), 0 0 30px rgba(147, 51, 234, 0.15)' // 卡片悬停阴影
                    }
                }
            }
        },
        button: {
            variants: {
                solid: {
                    background: '#9333EA', // 按钮背景
                    color: '#ffffff', // 按钮颜色
                    border: 'none', // 按钮边框
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // 按钮过渡
                    hover: {
                        transform: 'translateY(-2px)', // 按钮悬停变换
                        background: '#7E22CE', // 按钮悬停背景
                        boxShadow: '0 6px 20px rgba(147, 51, 234, 0.35)' // 按钮悬停阴影
                    }
                },
                outline: {
                    background: 'transparent', // 描边按钮背景
                    color: '#A78BFA', // 描边按钮颜色
                    border: '1.5px solid currentColor', // 描边按钮边框
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // 描边按钮过渡
                    hover: {
                        background: 'rgba(147, 51, 234, 0.1)', // 描边按钮悬停背景
                        transform: 'translateY(-2px)' // 描边按钮悬停变换
                    }
                }
            }
        },
        input: {
            background: 'rgba(30, 41, 59, 0.6)', // 输入框背景
            border: '1px solid rgba(147, 51, 234, 0.2)', // 输入框边框
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // 输入框过渡
            focus: {
                border: '1px solid rgba(147, 51, 234, 0.5)', // 输入框焦点边框
                boxShadow: '0 0 0 3px rgba(147, 51, 234, 0.15)' // 输入框焦点阴影
            }
        }
    },
    decorationColor: '#9333EA' // 装饰色
}