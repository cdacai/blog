// 方案1：原始简约风格
export const theme1 = {
    name: '简约',
    colors: {
        primary: '#ff4081',
        background: '#fff1f2',
        text: {
            primary: '#111827',
            secondary: '#6b7280',
            meta: '#9ca3af'
        },
        nav: {
            inactive: 'rgba(156, 163, 175, 0.75)',
            hover: 'rgba(156, 163, 175, 1)'
        },
        card: {
            background: '#ffffff'
        },
        divider: 'rgba(0, 0, 0, 0.04)',
        states: {
            hover: {
                primary: 'rgba(255, 64, 129, 0.9)',
                text: 'rgba(17, 24, 39, 0.9)',
                background: 'rgba(0, 0, 0, 0.02)'
            },
            active: {
                primary: 'rgba(255, 64, 129, 1)',
                text: 'rgba(17, 24, 39, 1)',
                background: 'rgba(0, 0, 0, 0.05)'
            },
            disabled: {
                primary: 'rgba(255, 64, 129, 0.4)',
                text: 'rgba(17, 24, 39, 0.4)',
                background: 'rgba(0, 0, 0, 0.1)'
            }
        },
        social: {
            github: '#24292e',
            twitter: '#1da1f2',
            facebook: '#1877f2',
            linkedin: '#0a66c2'
        },
        gradients: {
            primary: 'linear-gradient(45deg, var(--theme-primary) 0%, var(--theme-primary-light) 100%)',
            background: 'linear-gradient(180deg, var(--theme-bg) 0%, var(--theme-bg-secondary) 100%)'
        },
        variants: {
            primaryLight: 'rgba(var(--theme-primary-rgb), 0.1)',
            primaryDark: 'rgba(var(--theme-primary-rgb), 0.9)',
            textLight: 'rgba(var(--theme-text-primary-rgb), 0.1)',
            textDark: 'rgba(var(--theme-text-primary-rgb), 0.9)'
        },
        semantic: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        }
    },
    spacing: {
        headerHeight: '48px',
        headerTop: '32px',
        headerPadding: '0 32px',
        contentWidth: '1200px',
        contentPadding: '32px',
        mainPaddingTop: '100px',
        sidebarWidth: '280px',
        sidebarSpacing: '40px',
        gap: {
            grid: '80px',
            articles: '28px',
            nav: '56px',
            meta: '20px',
            social: '16px'
        },
        padding: {
            card: '32px',
            sidebar: '40px',
            content: '32px',
            nav: '12px 20px',
            meta: '6px 12px'
        },
        margin: {
            sectionTitle: '40px',
            articleTitle: '16px',
            articleMeta: '12px',
            articleDesc: '16px',
            sidebarSection: '32px',
            categoryItem: '8px'
        },
        sections: {
            aboutMarginBottom: '32px',
            categoriesMarginTop: '32px',
            articleFooterSpacing: '20px'
        },
        divider: {
            margin: '32px 0',
            opacity: '0.04'
        },
        base: {
            unit: '4px',
            scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100]
        },
        container: {
            maxWidth: '1200px',
            padding: {
                desktop: '32px',
                tablet: '24px',
                mobile: '16px'
            }
        },
        article: {
            spacing: {
                between: '32px',
                meta: '12px',
                title: '16px',
                description: '16px',
                footer: '20px'
            },
            padding: {
                desktop: '32px 40px',
                tablet: '24px 32px',
                mobile: '20px 24px'
            }
        },
        sidebar: {
            spacing: {
                section: '32px',
                item: '8px',
                title: '16px'
            }
        },
        presets: {
            compact: {
                card: '16px',
                container: '16px',
                section: '24px'
            },
            normal: {
                card: '24px',
                container: '32px',
                section: '48px'
            },
            relaxed: {
                card: '32px',
                container: '48px',
                section: '64px'
            }
        }
    },
    typography: {
        logo: {
            size: '24px',
            weight: 'bold'
        },
        nav: {
            size: '12px',
            spacing: '0.05em'
        },
        title: {
            size: '24px',
            lineHeight: '1.4',
            weight: 'normal',
            spacing: '-0.02em'
        },
        sectionTitle: {
            size: '22px',
            weight: 'normal',
            spacing: '-0.02em'
        },
        meta: {
            size: '12px',
            spacing: '0.05em'
        },
        description: {
            size: '14px',
            lineHeight: '1.6',
            spacing: '0.01em'
        },
        footer: {
            size: '13px',
            spacing: '0.02em'
        },
        sidebar: {
            title: {
                size: '1.1rem',
                weight: '600',
                spacing: '0.01em'
            },
            text: {
                size: '1rem',
                lineHeight: '1.8',
                spacing: '0.01em'
            },
            category: {
                size: '1rem',
                spacing: '0.01em'
            },
            count: {
                size: '0.9rem',
                lineHeight: '1.5'
            }
        },
        link: {
            size: '14px',
            weight: 'normal',
            decoration: 'none',
            color: 'var(--theme-text-meta)',
            hover: {
                color: 'var(--theme-text-primary)'
            },
            active: {
                color: 'var(--theme-primary)'
            }
        },
        article: {
            title: {
                size: '24px',
                lineHeight: '1.4',
                weight: 'normal',
                spacing: '-0.02em',
                decoration: 'none'
            },
            meta: {
                size: '12px',
                spacing: '0.05em',
                weight: 'normal',
                divider: {
                    size: '2px',
                    color: 'currentColor',
                    opacity: '0.6',
                    spacing: '10px'
                },
                date: {
                    color: 'var(--theme-text-meta)',
                    weight: 'normal'
                },
                readTime: {
                    color: 'var(--theme-text-meta)',
                    weight: 'normal'
                }
            },
            description: {
                size: '14px',
                lineHeight: '1.6',
                spacing: '0.01em',
                marginBottom: '16px'
            },
            category: {
                size: '12px',
                weight: 'normal',
                spacing: '0.02em',
                transform: 'none',
                color: 'var(--theme-primary)'
            }
        },
        category: {
            name: {
                size: '13px',
                weight: 'normal'
            },
            count: {
                size: '11px',
                lineHeight: '1.5',
                minWidth: '20px'
            }
        },
        base: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            size: '14px',
            lineHeight: '1.5',
            weight: {
                light: '300',
                regular: '400',
                medium: '500',
                semibold: '600',
                bold: '700'
            },
            color: 'var(--theme-text-primary)'
        },
        headings: {
            h1: {
                size: '32px',
                lineHeight: '1.2',
                weight: 'bold',
                spacing: '-0.02em',
                marginBottom: '24px'
            },
            h2: {
                size: '24px',
                lineHeight: '1.3',
                weight: '600',
                spacing: '-0.01em',
                marginBottom: '20px'
            },
            h3: {
                size: '20px',
                lineHeight: '1.4',
                weight: '600',
                spacing: '-0.01em',
                marginBottom: '16px'
            }
        },
        nav: {
            size: '12px',
            weight: 'normal',
            spacing: '0.05em',
            transform: 'uppercase',
            hover: {
                opacity: '1'
            }
        },
        variants: {
            mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            serif: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
            sans: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif'
        },
        presets: {
            title: {
                large: {
                    size: '32px',
                    lineHeight: '1.2',
                    weight: 'bold',
                    spacing: '-0.02em'
                },
                medium: {
                    size: '24px',
                    lineHeight: '1.3',
                    weight: '600',
                    spacing: '-0.01em'
                },
                small: {
                    size: '20px',
                    lineHeight: '1.4',
                    weight: '600',
                    spacing: '-0.01em'
                }
            },
            text: {
                large: {
                    size: '18px',
                    lineHeight: '1.6',
                    weight: 'normal'
                },
                medium: {
                    size: '16px',
                    lineHeight: '1.6',
                    weight: 'normal'
                },
                small: {
                    size: '14px',
                    lineHeight: '1.5',
                    weight: 'normal'
                },
                tiny: {
                    size: '12px',
                    lineHeight: '1.5',
                    weight: 'normal'
                }
            }
        }
    },
    borderRadius: {
        card: '12px',
        button: '4px',
        tag: '12px',
        input: '6px',
        image: '8px'
    },
    shadows: {
        card: '0 1px 3px rgba(0, 0, 0, 0.05)',
        hover: '0 4px 12px rgba(0, 0, 0, 0.08)',
        dropdown: '0 2px 8px rgba(0, 0, 0, 0.12)',
        button: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    transitions: {
        hover: 'all 0.2s ease',
        dropdown: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fade: 'opacity 0.2s ease',
        transform: {
            hover: 'translateY(-2px)'
        }
    },
    opacity: {
        hover: '1',
        inactive: '0.75',
        active: '1'
    },
    layout: {
        header: {
            position: 'fixed',
            background: 'transparent'
        },
        main: {
            minHeight: '100vh'
        },
        sidebar: {
            position: 'sticky',
            top: '32px'
        },
        breakpoints: {
            mobile: '480px',
            tablet: '768px',
            desktop: '1024px',
            wide: '1280px'
        },
        grid: {
            columns: 12,
            gap: {
                desktop: '32px',
                tablet: '24px',
                mobile: '16px'
            }
        },
        container: {
            maxWidth: {
                desktop: '1200px',
                tablet: '100%',
                mobile: '100%'
            }
        }
    },
    display: {
        header: 'flex',
        nav: 'flex',
        content: 'grid',
        footer: 'flex'
    },
    grid: {
        template: 'minmax(0, 1fr) var(--theme-sidebar-width)',
        gap: 'var(--theme-grid-gap)',
        layouts: {
            blog: {
                main: 'minmax(0, 1fr)',
                sidebar: 'var(--theme-sidebar-width)'
            },
            article: {
                content: 'minmax(0, 1fr)',
                toc: '240px'
            }
        }
    },
    align: {
        header: 'center',
        nav: 'center',
        content: 'start',
        footer: 'center'
    },
    justify: {
        header: 'space-between',
        nav: 'flex-end',
        content: 'space-between',
        footer: 'space-between'
    },
    list: {
        style: 'none',
        padding: '0',
        margin: '0'
    },
    animations: {
        duration: {
            fast: '0.15s',
            normal: '0.25s',
            slow: '0.35s'
        },
        timing: {
            default: 'ease',
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
            spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        },
        hover: {
            scale: '1.02',
            translateY: '-2px',
            shadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
    },
    responsive: {
        mobile: {
            fontSize: '14px',
            spacing: {
                unit: '4px',
                container: '16px',
                grid: '16px'
            }
        },
        tablet: {
            fontSize: '15px',
            spacing: {
                unit: '4px',
                container: '24px',
                grid: '24px'
            }
        },
        desktop: {
            fontSize: '16px',
            spacing: {
                unit: '4px',
                container: '32px',
                grid: '32px'
            }
        }
    },
    effects: {
        hover: {
            transform: {
                subtle: 'translateY(-1px)',
                medium: 'translateY(-2px)',
                large: 'translateY(-4px)'
            },
            shadow: {
                subtle: '0 2px 4px rgba(0,0,0,0.05)',
                medium: '0 4px 8px rgba(0,0,0,0.1)',
                large: '0 8px 16px rgba(0,0,0,0.15)'
            },
            scale: {
                subtle: 'scale(1.01)',
                medium: 'scale(1.02)',
                large: 'scale(1.05)'
            }
        },
        focus: {
            ring: {
                width: '2px',
                color: 'rgba(var(--theme-primary-rgb), 0.4)',
                offset: '2px'
            }
        }
    },
    motion: {
        duration: {
            instant: '0.1s',
            fast: '0.2s',
            normal: '0.3s',
            slow: '0.5s'
        },
        easing: {
            linear: 'linear',
            ease: 'ease',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }
    },
    components: {
        card: {
            variants: {
                elevated: {
                    shadow: 'var(--theme-shadow-card)',
                    hover: 'var(--theme-shadow-hover)'
                },
                outlined: {
                    border: '1px solid var(--theme-border-color)',
                    hover: 'var(--theme-border-hover)'
                },
                flat: {
                    background: 'var(--theme-bg-secondary)',
                    hover: 'var(--theme-bg-hover)'
                }
            }
        },
        button: {
            variants: {
                solid: {
                    background: 'var(--theme-primary)',
                    color: '#fff'
                },
                outline: {
                    border: '1px solid var(--theme-primary)',
                    color: 'var(--theme-primary)'
                },
                ghost: {
                    color: 'var(--theme-primary)',
                    hover: 'var(--theme-primary-light)'
                }
            },
            sizes: {
                small: {
                    padding: '4px 12px',
                    fontSize: '12px'
                },
                medium: {
                    padding: '8px 16px',
                    fontSize: '14px'
                },
                large: {
                    padding: '12px 24px',
                    fontSize: '16px'
                }
            }
        }
    }
}

// 方案2：雅致风格
export const theme2 = {
    name: '雅致',
    colors: {
        primary: '#e86c8d',
        background: '#fdf2f3',
        text: {
            primary: '#2c3e50',
            secondary: '#64748b',
            meta: '#94a3b8'
        },
        nav: {
            inactive: 'rgba(156, 163, 175, 0.75)',
            hover: 'rgba(156, 163, 175, 1)'
        },
        card: {
            background: '#ffffff'
        },
        divider: 'rgba(0, 0, 0, 0.05)',
        states: {
            hover: {
                primary: 'rgba(255, 64, 129, 0.9)',
                text: 'rgba(17, 24, 39, 0.9)',
                background: 'rgba(0, 0, 0, 0.02)'
            },
            active: {
                primary: 'rgba(255, 64, 129, 1)',
                text: 'rgba(17, 24, 39, 1)',
                background: 'rgba(0, 0, 0, 0.05)'
            },
            disabled: {
                primary: 'rgba(255, 64, 129, 0.4)',
                text: 'rgba(17, 24, 39, 0.4)',
                background: 'rgba(0, 0, 0, 0.1)'
            }
        },
        social: {
            github: '#24292e',
            twitter: '#1da1f2',
            facebook: '#1877f2',
            linkedin: '#0a66c2'
        },
        gradients: {
            primary: 'linear-gradient(45deg, var(--theme-primary) 0%, var(--theme-primary-light) 100%)',
            background: 'linear-gradient(180deg, var(--theme-bg) 0%, var(--theme-bg-secondary) 100%)'
        },
        variants: {
            primaryLight: 'rgba(var(--theme-primary-rgb), 0.1)',
            primaryDark: 'rgba(var(--theme-primary-rgb), 0.9)',
            textLight: 'rgba(var(--theme-text-primary-rgb), 0.1)',
            textDark: 'rgba(var(--theme-text-primary-rgb), 0.9)'
        },
        semantic: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        }
    },
    spacing: {
        headerHeight: '48px',
        headerTop: '32px',
        headerPadding: '0 36px',
        contentWidth: '1120px',
        contentPadding: '36px',
        mainPaddingTop: '100px',
        sidebarWidth: '280px',
        sidebarSpacing: '36px',
        gap: {
            grid: '100px',
            articles: '32px',
            nav: '56px',
            meta: '20px',
            social: '20px'
        },
        padding: {
            card: '36px 40px',
            sidebar: '36px',
            content: '32px',
            nav: '14px 24px',
            meta: '8px 16px'
        },
        margin: {
            sectionTitle: '36px',
            articleTitle: '14px',
            articleMeta: '12px',
            articleDesc: '16px',
            sidebarSection: '36px',
            categoryItem: '10px'
        },
        sections: {
            aboutMarginBottom: '36px',
            categoriesMarginTop: '36px',
            articleFooterSpacing: '24px'
        },
        divider: {
            margin: '36px 0',
            opacity: '0.05'
        },
        base: {
            unit: '4px',
            scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100]
        },
        container: {
            maxWidth: '1200px',
            padding: {
                desktop: '32px',
                tablet: '24px',
                mobile: '16px'
            }
        },
        article: {
            spacing: {
                between: '32px',
                meta: '12px',
                title: '16px',
                description: '16px',
                footer: '20px'
            },
            padding: {
                desktop: '32px 40px',
                tablet: '24px 32px',
                mobile: '20px 24px'
            }
        },
        sidebar: {
            spacing: {
                section: '32px',
                item: '8px',
                title: '16px'
            }
        },
        presets: {
            compact: {
                card: '16px',
                container: '16px',
                section: '24px'
            },
            normal: {
                card: '24px',
                container: '32px',
                section: '48px'
            },
            relaxed: {
                card: '32px',
                container: '48px',
                section: '64px'
            }
        }
    },
    typography: {
        logo: {
            size: '24px',
            weight: 'bold'
        },
        nav: {
            size: '13px',
            spacing: '0.03em'
        },
        title: {
            size: '22px',
            lineHeight: '1.5',
            weight: 'normal',
            spacing: '-0.02em'
        },
        sectionTitle: {
            size: '20px',
            weight: '400',
            spacing: '-0.02em'
        },
        meta: {
            size: '12px',
            spacing: '0.03em'
        },
        description: {
            size: '14px',
            lineHeight: '1.7',
            spacing: '0.01em'
        },
        footer: {
            size: '13px',
            spacing: '0.02em'
        },
        sidebar: {
            title: {
                size: '1.1rem',
                weight: '600',
                spacing: '0.01em'
            },
            text: {
                size: '1rem',
                lineHeight: '1.8',
                spacing: '0.01em'
            },
            category: {
                size: '1rem',
                spacing: '0.01em'
            },
            count: {
                size: '0.9rem',
                lineHeight: '1.5'
            }
        },
        link: {
            size: '14px',
            weight: 'normal',
            decoration: 'none'
        },
        article: {
            title: {
                size: '24px',
                lineHeight: '1.4',
                weight: 'normal',
                spacing: '-0.02em',
                decoration: 'none'
            },
            meta: {
                size: '12px',
                spacing: '0.05em',
                weight: 'normal'
            },
            description: {
                size: '14px',
                lineHeight: '1.6',
                spacing: '0.01em'
            }
        },
        base: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            size: '14px',
            lineHeight: '1.5',
            weight: 'normal'
        }
    },
    borderRadius: {
        card: '16px',
        button: '4px',
        tag: '12px',
        input: '6px',
        image: '8px'
    },
    shadows: {
        card: '0 1px 3px rgba(0, 0, 0, 0.05)',
        hover: '0 4px 12px rgba(0, 0, 0, 0.08)',
        dropdown: '0 2px 8px rgba(0, 0, 0, 0.12)',
        button: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    transitions: {
        hover: 'all 0.2s ease',
        dropdown: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fade: 'opacity 0.2s ease',
        transform: {
            hover: 'translateY(-2px)'
        }
    },
    opacity: {
        hover: '1',
        inactive: '0.75',
        active: '1'
    },
    layout: {
        header: {
            position: 'fixed',
            background: 'transparent'
        },
        main: {
            minHeight: '100vh'
        },
        sidebar: {
            position: 'sticky',
            top: '32px'
        },
        breakpoints: {
            mobile: '480px',
            tablet: '768px',
            desktop: '1024px',
            wide: '1280px'
        },
        grid: {
            columns: 12,
            gap: {
                desktop: '32px',
                tablet: '24px',
                mobile: '16px'
            }
        },
        container: {
            maxWidth: {
                desktop: '1200px',
                tablet: '100%',
                mobile: '100%'
            }
        }
    },
    display: {
        header: 'flex',
        nav: 'flex',
        content: 'grid',
        footer: 'flex'
    },
    grid: {
        template: 'minmax(0, 1fr) var(--theme-sidebar-width)',
        gap: 'var(--theme-grid-gap)',
        layouts: {
            blog: {
                main: 'minmax(0, 1fr)',
                sidebar: 'var(--theme-sidebar-width)'
            },
            article: {
                content: 'minmax(0, 1fr)',
                toc: '240px'
            }
        }
    },
    align: {
        header: 'center',
        nav: 'center',
        content: 'start',
        footer: 'center'
    },
    justify: {
        header: 'space-between',
        nav: 'flex-end',
        content: 'space-between',
        footer: 'space-between'
    },
    list: {
        style: 'none',
        padding: '0',
        margin: '0'
    },
    animations: {
        duration: {
            fast: '0.15s',
            normal: '0.25s',
            slow: '0.35s'
        },
        timing: {
            default: 'ease',
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
            spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        },
        hover: {
            scale: '1.02',
            translateY: '-2px',
            shadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
    },
    responsive: {
        mobile: {
            fontSize: '14px',
            spacing: {
                unit: '4px',
                container: '16px',
                grid: '16px'
            }
        },
        tablet: {
            fontSize: '15px',
            spacing: {
                unit: '4px',
                container: '24px',
                grid: '24px'
            }
        },
        desktop: {
            fontSize: '16px',
            spacing: {
                unit: '4px',
                container: '32px',
                grid: '32px'
            }
        }
    },
    effects: {
        hover: {
            transform: {
                subtle: 'translateY(-2px)',
                medium: 'translateY(-4px)',
                large: 'translateY(-6px)'
            },
            shadow: {
                subtle: '0 4px 16px rgba(0,0,0,0.06)',
                medium: '0 8px 24px rgba(0,0,0,0.08)',
                large: '0 12px 32px rgba(0,0,0,0.1)'
            },
            scale: {
                subtle: 'scale(1.03)',
                medium: 'scale(1.05)',
                large: 'scale(1.07)'
            },
            glow: {
                subtle: '0 0 25px rgba(167,139,250,0.3)',
                medium: '0 0 35px rgba(167,139,250,0.4)',
                large: '0 0 45px rgba(167,139,250,0.5)'
            }
        },
        focus: {
            ring: {
                width: '4px',
                color: 'rgba(167, 139, 250, 0.35)',
                offset: '2px'
            }
        }
    },
    motion: {
        duration: {
            instant: '0.1s',
            fast: '0.3s',
            normal: '0.4s',
            slow: '0.6s',
            slower: '0.8s'
        },
        easing: {
            linear: 'linear',
            ease: 'ease',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            spring: 'cubic-bezier(0.155, 1.105, 0.295, 1.12)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    },
    components: {
        card: {
            variants: {
                elevated: {
                    background: 'var(--theme-variants-glass)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--theme-card-border)',
                    shadow: 'var(--theme-shadow-card)',
                    hover: {
                        transform: 'translateY(-6px)',
                        shadow: 'var(--theme-shadow-hover)',
                        glow: 'var(--theme-card-glow)'
                    }
                },
                outlined: {
                    background: 'transparent',
                    border: '1px solid var(--theme-card-border)',
                    hover: {
                        borderImage: 'var(--theme-gradients-border) 1',
                        transform: 'translateY(-4px)'
                    }
                },
                gradient: {
                    background: 'var(--theme-gradients-card)',
                    backdropFilter: 'blur(20px)',
                    hover: {
                        transform: 'translateY(-6px)',
                        shadow: 'var(--theme-shadow-hover)',
                        glow: 'var(--theme-card-glow)'
                    }
                }
            }
        },
        button: {
            variants: {
                solid: {
                    background: 'var(--theme-gradients-primary)',
                    color: '#ffffff',
                    shadow: 'var(--theme-shadow-button)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    hover: {
                        transform: 'translateY(-3px)',
                        shadow: '0 8px 16px rgba(167, 139, 250, 0.4)',
                        glow: '0 0 20px rgba(167, 139, 250, 0.3)'
                    }
                },
                outline: {
                    background: 'transparent',
                    border: '2px solid var(--theme-primary)',
                    color: 'var(--theme-primary)',
                    hover: {
                        background: 'var(--theme-variants-primaryLight)',
                        transform: 'translateY(-3px)'
                    }
                },
                ghost: {
                    background: 'transparent',
                    color: 'var(--theme-primary)',
                    hover: {
                        background: 'var(--theme-variants-primaryLight)',
                        transform: 'translateY(-3px)'
                    }
                },
                glass: {
                    background: 'var(--theme-variants-glass)',
                    backdropFilter: 'blur(20px)',
                    color: 'var(--theme-text-primary)',
                    border: '1px solid var(--theme-card-border)',
                    hover: {
                        transform: 'translateY(-3px)',
                        shadow: 'var(--theme-shadow-hover)'
                    }
                }
            },
            sizes: {
                small: {
                    padding: '10px 20px',
                    fontSize: '15px',
                    height: '40px',
                    borderRadius: '12px'
                },
                medium: {
                    padding: '14px 24px',
                    fontSize: '16px',
                    height: '48px',
                    borderRadius: '14px'
                },
                large: {
                    padding: '16px 32px',
                    fontSize: '17px',
                    height: '56px',
                    borderRadius: '16px'
                }
            }
        }
    }
}

// 方案3：技术博客风格
export const theme3 = {
    name: '极简',
    colors: {
        primary: '#3B82F6',
        background: '#F8FAFC',
        text: {
            primary: '#1E293B',
            secondary: '#64748B',
            meta: '#94A3B8',
            code: '#4B5563'
        },
        nav: {
            inactive: 'rgba(100, 116, 139, 0.75)',
            hover: 'rgba(59, 130, 246, 0.9)',
            active: '#3B82F6'
        },
        card: {
            background: '#ffffff',
            hover: 'rgba(248, 250, 252, 0.8)',
            border: 'rgba(226, 232, 240, 0.8)'
        },
        divider: 'rgba(226, 232, 240, 0.8)',
        states: {
            hover: {
                primary: 'rgba(59, 130, 246, 0.9)',
                text: 'rgba(30, 41, 59, 0.9)',
                background: 'rgba(250, 250, 250, 0.9)'
            },
            active: {
                primary: '#3B82F6',
                text: '#1E293B',
                background: '#F1F5F9'
            },
            disabled: {
                primary: 'rgba(59, 130, 246, 0.4)',
                text: 'rgba(30, 41, 59, 0.4)',
                background: 'rgba(241, 245, 249, 0.4)'
            }
        },
        social: {
            github: '#24292e',
            twitter: '#1da1f2',
            facebook: '#1877f2',
            linkedin: '#0a66c2'
        },
        gradients: {
            primary: 'linear-gradient(45deg, #3B82F6 0%, #60A5FA 100%)',
            background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
            card: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
            text: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
            border: 'linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(139,92,246,0.3) 100%)'
        },
        variants: {
            primaryLight: 'rgba(59, 130, 246, 0.1)',
            primaryDark: 'rgba(59, 130, 246, 0.9)',
            textLight: 'rgba(248, 250, 252, 0.15)',
            textDark: 'rgba(248, 250, 252, 0.9)',
            glass: 'rgba(30, 41, 59, 0.8)'
        },
        semantic: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        }
    },
    spacing: {
        headerHeight: '56px',
        headerTop: '24px',
        headerPadding: '0 24px',
        contentWidth: '1080px',
        contentPadding: '24px',
        mainPaddingTop: '100px',
        sidebarWidth: '300px',
        sidebarSpacing: '32px',
        gap: {
            grid: '64px',
            articles: '40px',
            nav: '48px',
            meta: '16px',
            social: '20px'
        },
        padding: {
            card: '32px 40px',
            sidebar: '32px',
            content: '24px',
            nav: '16px 24px',
            meta: '8px 16px'
        },
        margin: {
            sectionTitle: '32px',
            articleTitle: '16px',
            articleMeta: '12px',
            articleDesc: '16px',
            sidebarSection: '32px',
            categoryItem: '12px'
        },
        sections: {
            aboutMarginBottom: '32px',
            categoriesMarginTop: '32px',
            articleFooterSpacing: '24px'
        },
        divider: {
            margin: '32px 0',
            opacity: '0.06'
        },
        base: {
            unit: '4px',
            scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100]
        },
        container: {
            maxWidth: '1080px',
            padding: {
                desktop: '32px',
                tablet: '24px',
                mobile: '16px'
            }
        },
        article: {
            spacing: {
                between: '40px',
                meta: '12px',
                title: '16px',
                description: '16px',
                footer: '20px'
            },
            padding: {
                desktop: '32px 40px',
                tablet: '24px 32px',
                mobile: '20px 24px'
            }
        },
        sidebar: {
            spacing: {
                section: '32px',
                item: '8px',
                title: '16px'
            }
        },
        presets: {
            compact: {
                card: '16px',
                container: '16px',
                section: '24px'
            },
            normal: {
                card: '24px',
                container: '32px',
                section: '48px'
            },
            relaxed: {
                card: '32px',
                container: '48px',
                section: '64px'
            }
        }
    },
    typography: {
        logo: {
            size: '24px',
            weight: '600',
            spacing: '-0.02em',
            gradient: 'var(--theme-gradients-text)'
        },
        nav: {
            size: '14px',
            spacing: '0.02em',
            weight: '500',
            transform: 'none'
        },
        title: {
            size: '28px',
            lineHeight: '1.4',
            weight: '600',
            spacing: '-0.01em',
            gradient: 'var(--theme-gradients-text)'
        },
        sectionTitle: {
            size: '20px',
            weight: '400',
            spacing: '-0.02em',
            marginBottom: '24px',
            gradient: 'var(--theme-gradients-text)'
        },
        meta: {
            size: '13px',
            spacing: '0.02em',
            weight: '400'
        },
        description: {
            size: '15px',
            lineHeight: '1.7',
            spacing: '0.01em',
            weight: '400'
        },
        footer: {
            size: '14px',
            spacing: '0.02em',
            weight: '400'
        },
        sidebar: {
            title: {
                size: '1.1rem',
                weight: '600',
                spacing: '0.01em'
            },
            text: {
                size: '1rem',
                lineHeight: '1.8',
                spacing: '0.01em'
            },
            category: {
                size: '1rem',
                spacing: '0.01em'
            },
            count: {
                size: '0.9rem',
                lineHeight: '1.5'
            },
            categories: {
                title: {},
                item: {
                    name: {}
                }
            }
        },
        link: {
            size: '16px',
            weight: '600',
            decoration: 'none',
            hover: {
                color: 'var(--theme-text-accent)',
                decoration: 'none'
            }
        },
        article: {
            title: {
                size: '36px',
                lineHeight: '1.2',
                weight: '800',
                spacing: '-0.03em',
                decoration: 'none',
                color: '#F8FAFC',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                hover: {
                    transform: 'translateY(-3px)',
                    decoration: 'none',
                    color: '#FFFFFF'
                }
            },
            meta: {
                size: '15px',
                spacing: '0.03em',
                weight: '500',
                color: '#94A3B8',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            },
            description: {
                size: '17px',
                lineHeight: '1.8',
                spacing: '0.02em',
                weight: '400',
                color: '#CBD5E1',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            },
            category: {
                size: '15px',
                weight: '700',
                spacing: '0.03em',
                transform: 'none',
                gradient: 'var(--theme-gradients-text)',
                hover: {
                    opacity: '0.9'
                }
            }
        },
        base: {
            family: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            size: '17px',
            lineHeight: '1.8',
            weight: '400'
        },
        headings: {
            h1: {
                size: '32px',
                lineHeight: '1.2',
                weight: 'bold',
                spacing: '-0.02em',
                marginBottom: '24px'
            },
            h2: {
                size: '24px',
                lineHeight: '1.3',
                weight: '600',
                spacing: '-0.01em',
                marginBottom: '20px'
            },
            h3: {
                size: '20px',
                lineHeight: '1.4',
                weight: '600',
                spacing: '-0.01em',
                marginBottom: '16px'
            }
        },
        variants: {
            mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            serif: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
            sans: 'Plus Jakarta Sans, Inter, system-ui, sans-serif'
        },
        presets: {
            title: {
                large: {
                    size: '40px',
                    lineHeight: '1.2',
                    weight: '800',
                    spacing: '-0.03em'
                },
                medium: {
                    size: '32px',
                    lineHeight: '1.3',
                    weight: '700',
                    spacing: '-0.02em'
                },
                small: {
                    size: '24px',
                    lineHeight: '1.4',
                    weight: '600',
                    spacing: '-0.01em'
                }
            },
            text: {
                large: {
                    size: '20px',
                    lineHeight: '1.6',
                    weight: '400'
                },
                medium: {
                    size: '17px',
                    lineHeight: '1.6',
                    weight: '400'
                },
                small: {
                    size: '15px',
                    lineHeight: '1.5',
                    weight: '400'
                },
                tiny: {
                    size: '13px',
                    lineHeight: '1.5',
                    weight: '400'
                }
            }
        }
    },
    borderRadius: {
        card: '20px',
        button: '12px',
        tag: '8px',
        input: '12px',
        image: '24px'
    },
    shadows: {
        card: '0 8px 32px rgba(0, 0, 0, 0.2)',
        hover: '0 16px 48px rgba(0, 0, 0, 0.25)',
        dropdown: '0 8px 24px rgba(0, 0, 0, 0.2)',
        button: '0 2px 8px rgba(47, 133, 90, 0.08)',
        focus: '0 0 0 2px rgba(47, 133, 90, 0.08)'
    },
    effects: {
        hover: {
            transform: {
                subtle: 'translateY(-2px)',
                medium: 'translateY(-3px)',
                large: 'translateY(-4px)'
            },
            shadow: {
                subtle: '0 4px 16px rgba(26, 71, 49, 0.03)',
                medium: '0 6px 24px rgba(26, 71, 49, 0.05)',
                large: '0 8px 32px rgba(26, 71, 49, 0.07)'
            }
        },
        transition: {
            default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            smooth: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    },
    motion: {
        duration: {
            instant: '0.1s',
            fast: '0.3s',
            normal: '0.4s',
            slow: '0.6s',
            slower: '0.8s'
        },
        easing: {
            linear: 'linear',
            ease: 'ease',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            spring: 'cubic-bezier(0.155, 1.105, 0.295, 1.12)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    },
    components: {
        card: {
            variants: {
                elevated: {
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    hover: {
                        transform: 'translateY(-3px)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 8px 30px rgba(26, 71, 49, 0.04)'
                    }
                }
            }
        },
        button: {
            variants: {
                solid: {
                    background: '#2F855A',
                    color: '#ffffff',
                    border: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    hover: {
                        transform: 'translateY(-2px)',
                        background: '#276749',
                        boxShadow: '0 4px 12px rgba(47, 133, 90, 0.2)'
                    }
                },
                outline: {
                    background: 'transparent',
                            color: '#2F855A',
                    border: '1.5px solid currentColor',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            hover: {
                        background: 'rgba(47, 133, 90, 0.05)',
                        transform: 'translateY(-2px)'
                    }
                }
            }
        },
        input: {
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        focus: {
                border: '1px solid rgba(47, 133, 90, 0.5)',
                boxShadow: '0 0 0 3px rgba(47, 133, 90, 0.1)'
            }
        }
    }
}

// 方案5：科技感风格
const theme5Base = {
    name: '科技',
    colors: {
        primary: '#2F855A',
        background: '#8bc594',
        text: {
            primary: '#1A4731',
            secondary: '#276749',
            meta: '#2F855A',
            code: '#234E52',
            accent: '#38A169'
        },
        nav: {
            inactive: 'rgba(44, 82, 60, 0.8)',
            hover: 'rgba(47, 133, 90, 0.9)',
            active: '#2F855A',
            background: 'rgba(255, 255, 255, 0.95)',
            blur: '20px'
        },
        card: {
            background: '#ffffffd1',
            hover: 'rgba(255, 255, 255, 0.95)',
            border: 'rgba(47, 133, 90, 0.1)',
            glow: '0 0 30px rgba(47, 133, 90, 0.08)'
        },
        divider: 'rgba(47, 133, 90, 0.08)',
        states: {
            hover: {
                primary: 'rgba(47, 133, 90, 0.9)',
                text: '#1A4731',
                background: 'rgba(255, 255, 255, 0.95)'
            },
            active: {
                primary: '#2F855A',
                text: '#1A4731',
                background: 'rgba(255, 255, 255, 1)'
            },
            disabled: {
                primary: 'rgba(47, 133, 90, 0.4)',
                text: 'rgba(26, 71, 49, 0.4)',
                background: 'rgba(255, 255, 255, 0.4)'
            }
        },
        gradients: {
            primary: 'linear-gradient(135deg, #276749 0%, #2F855A 50%, #38A169 100%)',
            background: {
                color: '#8bc594',
                image: `linear-gradient(180deg, #8bc594 0%, #a3d4ab 100%),url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.pattern{fill:%239ed3a7;fill-opacity:0.8}%3C/style%3E%3Crect width='40' height='40' fill='none'/%3E%3Cpath class='pattern' d='M0 0h40v2H0zM0 10h40v2H0zM0 20h40v2H0zM0 30h40v2H0zM0 0h2v40H0zM10 0h2v40h-2zM20 0h2v40h-2zM30 0h2v40h-2z'/%3E%3C/svg%3E")`,
                repeat: 'repeat',
                position: 'center',
                size: '40px'
            },
            card: 'none',
            text: 'linear-gradient(90deg, #1A4731 0%, #276749 100%)',
            border: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
            glow: 'linear-gradient(135deg, rgba(47, 133, 90, 0.25) 0%, rgba(56, 161, 105, 0.1) 100%)'
        }
    },
    shadows: {
        card: '0 4px 20px rgba(26, 71, 49, 0.04), 0 8px 30px rgba(26, 71, 49, 0.02)',
        hover: '0 10px 30px rgba(26, 71, 49, 0.06), 0 15px 40px rgba(26, 71, 49, 0.03)',
        dropdown: '0 4px 12px rgba(26, 71, 49, 0.04)',
        button: '0 2px 8px rgba(47, 133, 90, 0.15)',
        focus: '0 0 0 3px rgba(47, 133, 90, 0.15)'
    },
    borderRadius: {
        card: '20px',
        button: '12px',
        tag: '8px',
        image: '16px',
        input: '10px'
    },
    // theme5 独有 spacing/typography/effects/components 可在此补充
};

export const theme5 = Object.assign({}, theme3, theme5Base, {
    spacing: Object.assign({}, theme3.spacing, theme5Base.spacing),
    typography: Object.assign({}, theme3.typography, theme5Base.typography),
    effects: Object.assign({}, theme3.effects, theme5Base.effects),
    components: Object.assign({}, theme3.components, theme5Base.components)
});

// 方案6：清雅风格（基于 theme5 的变体）
const theme6Base = {
    name: '清雅',
    // 只写 theme6 独有属性，如 spacing/typography/effects/components
};
export const theme6 = Object.assign({}, theme5, theme6Base, {
    spacing: Object.assign({}, theme5.spacing, theme6Base.spacing),
    typography: Object.assign({}, theme5.typography, theme6Base.typography),
    effects: Object.assign({}, theme5.effects, theme6Base.effects),
    components: Object.assign({}, theme5.components, theme6Base.components)
});

// 方案7：未来科技风格（基于 theme5 的变体）
const theme7Base = {
    name: '未来',
    // 只写 theme7 独有属性，如 spacing/typography/effects/components
};
export const theme7 = Object.assign({}, theme5, theme7Base, {
    spacing: Object.assign({}, theme5.spacing, theme7Base.spacing),
    typography: Object.assign({}, theme5.typography, theme7Base.typography),
    effects: Object.assign({}, theme5.effects, theme7Base.effects),
    components: Object.assign({}, theme5.components, theme7Base.components)
});

// 导出所有主题
export const themes = {
    theme1,
    theme2,
    theme3,
    theme5,
    theme6,
    theme7
}

// 获取主题
export const getTheme = (themeName) => {
    return themes[themeName] || theme1
}

// 添加 zIndex 配置
export const zIndex = {
    header: 100,
    dropdown: 1000,
    modal: 2000
} 