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
                size: '18px',
                spacing: '-0.02em',
                weight: 'normal'
            },
            text: {
                size: '13px',
                lineHeight: '1.7',
                spacing: '0.01em'
            },
            category: {
                size: '13px',
                spacing: '0.01em'
            },
            count: {
                size: '11px',
                lineHeight: '1.5'
            },
            about: {
                title: {
                    size: '18px',
                    weight: '600',
                    color: 'var(--theme-text-primary)',
                    marginBottom: '16px'
                },
                description: {
                    size: '14px',
                    lineHeight: '1.6',
                    color: 'var(--theme-text-secondary)',
                    marginBottom: '16px'
                }
            },
            categories: {
                title: {
                    size: '18px',
                    weight: '600',
                    color: 'var(--theme-text-primary)',
                    marginBottom: '16px'
                },
                item: {
                    name: {
                        size: '14px',
                        color: 'var(--theme-text-secondary)',
                        hover: {
                            color: 'var(--theme-text-primary)'
                        }
                    },
                    count: {
                        size: '12px',
                        color: '#fff',
                        background: 'var(--theme-primary)'
                    }
                }
            },
            social: {
                link: {
                    size: '12px',
                    color: 'var(--theme-primary)',
                    hover: {
                        opacity: '0.8'
                    }
                }
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
                size: '18px',
                spacing: '-0.02em',
                weight: 'normal'
            },
            text: {
                size: '13px',
                lineHeight: '1.7',
                spacing: '0.01em'
            },
            category: {
                size: '13px',
                spacing: '0.01em'
            },
            count: {
                size: '11px',
                lineHeight: '1.5'
            },
            about: {
                title: {
                    size: '18px',
                    weight: '600',
                    color: 'var(--theme-text-primary)',
                    marginBottom: '16px'
                },
                description: {
                    size: '14px',
                    lineHeight: '1.6',
                    color: 'var(--theme-text-secondary)',
                    marginBottom: '16px'
                }
            },
            categories: {
                title: {
                    size: '18px',
                    weight: '600',
                    color: 'var(--theme-text-primary)',
                    marginBottom: '16px'
                },
                item: {
                    name: {
                        size: '14px',
                        color: 'var(--theme-text-secondary)',
                        hover: {
                            color: 'var(--theme-text-primary)'
                        }
                    },
                    count: {
                        size: '12px',
                        color: '#fff',
                        background: 'var(--theme-primary)'
                    }
                }
            },
            social: {
                link: {
                    size: '12px',
                    color: 'var(--theme-primary)',
                    hover: {
                        opacity: '0.8'
                    }
                }
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
                    hover: {
                        transform: 'translateY(-3px)',
                        shadow: '0 8px 16px rgba(167, 139, 250, 0.4)'
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
            categoryItem: '8px'
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
            size: '26px',
            lineHeight: '1.4',
            weight: '700',
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
                size: '20px',
                spacing: '-0.02em',
                weight: '600',
                marginBottom: '32px',
                gradient: 'var(--theme-gradients-text)'
            },
            text: {
                size: '16px',
                lineHeight: '1.8',
                spacing: '0.02em',
                weight: '400'
            },
            category: {
                size: '16px',
                spacing: '0.02em',
                weight: '600'
            },
            count: {
                size: '14px',
                lineHeight: '1.4',
                weight: '700'
            },
            about: {
                title: {
                    size: '24px',
                    weight: '700',
                    color: 'var(--theme-text-primary)',
                    marginBottom: '24px'
                },
                description: {
                    size: '16px',
                    lineHeight: '1.8',
                    color: 'var(--theme-text-secondary)',
                    marginBottom: '24px'
                }
            },
            categories: {
                title: {
                    size: '24px',
                    weight: '700',
                    color: 'var(--theme-text-primary)',
                    marginBottom: '24px'
                },
                item: {
                    name: {
                        size: '16px',
                        color: 'var(--theme-text-secondary)',
                        hover: {
                            color: 'var(--theme-text-primary)'
                        }
                    },
                    count: {
                        size: '14px',
                        color: '#fff',
                        background: 'var(--theme-primary)'
                    }
                }
            },
            social: {
                link: {
                    size: '14px',
                    color: 'var(--theme-primary)',
                    hover: {
                        opacity: '0.8'
                    }
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
        button: '0 4px 12px rgba(167, 139, 250, 0.3)',
        focus: '0 0 0 4px rgba(167, 139, 250, 0.35)'
    },
    effects: {
        hover: {
            transform: {
                subtle: 'translateY(-3px)',
                medium: 'translateY(-6px)',
                large: 'translateY(-8px)'
            },
            shadow: {
                subtle: '0 8px 24px rgba(0,0,0,0.2)',
                medium: '0 16px 32px rgba(0,0,0,0.25)',
                large: '0 24px 48px rgba(0,0,0,0.3)'
            },
            scale: {
                subtle: 'scale(1.03)',
                medium: 'scale(1.05)',
                large: 'scale(1.07)'
            },
            glow: {
                subtle: '0 0 30px rgba(167,139,250,0.3)',
                medium: '0 0 40px rgba(167,139,250,0.4)',
                large: '0 0 50px rgba(167,139,250,0.5)'
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
                    backdropFilter: 'blur(24px)',
                    border: '1px solid var(--theme-card-border)',
                    shadow: 'var(--theme-shadow-card)',
                    hover: {
                        transform: 'translateY(-6px)',
                        shadow: 'var(--theme-shadow-hover)',
                        glow: 'var(--theme-card-glow)'
                    }
                },
                gradient: {
                    background: 'var(--theme-gradients-card)',
                    backdropFilter: 'blur(24px)',
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
                    color: '#FFFFFF',
                    shadow: 'var(--theme-shadow-button)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    hover: {
                        transform: 'translateY(-3px)',
                        shadow: '0 8px 16px rgba(167, 139, 250, 0.4)',
                        glow: '0 0 20px rgba(167, 139, 250, 0.3)'
                    }
                },
                glass: {
                    background: 'var(--theme-variants-glass)',
                    backdropFilter: 'blur(24px)',
                    color: '#F8FAFC',
                    border: '1px solid var(--theme-card-border)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    hover: {
                        transform: 'translateY(-3px)',
                        shadow: 'var(--theme-shadow-hover)',
                        glow: '0 0 20px rgba(167, 139, 250, 0.2)'
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

// 方案4：创意风格
export const theme4 = {
    name: '创意',
    colors: {
        primary: '#7C3AED',
        background: '#0F172A',
        text: {
            primary: '#F8FAFC',
            secondary: '#CBD5E1',
            meta: '#94A3B8',
            code: '#E2E8F0',
            accent: '#A78BFA'
        },
        nav: {
            inactive: 'rgba(203, 213, 225, 0.7)',
            hover: 'rgba(167, 139, 250, 0.9)',
            active: '#A78BFA',
            background: 'rgba(15, 23, 42, 0.85)',
            blur: '24px'
        },
        card: {
            background: 'rgba(30, 41, 59, 0.85)',
            hover: 'rgba(30, 41, 59, 0.95)',
            border: 'rgba(167, 139, 250, 0.25)',
            glow: '0 0 40px rgba(167, 139, 250, 0.2)'
        },
        divider: 'rgba(167, 139, 250, 0.2)',
        states: {
            hover: {
                primary: 'rgba(167, 139, 250, 0.95)',
                text: '#FFFFFF',
                background: 'rgba(30, 41, 59, 0.9)'
            },
            active: {
                primary: '#A78BFA',
                text: '#FFFFFF',
                background: '#1E293B'
            },
            disabled: {
                primary: 'rgba(167, 139, 250, 0.4)',
                text: 'rgba(248, 250, 252, 0.4)',
                background: 'rgba(30, 41, 59, 0.4)'
            }
        },
        gradients: {
            primary: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)',
            background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
            card: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
            text: 'linear-gradient(90deg, #F8FAFC 0%, #E2E8F0 100%)',
            border: 'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(196, 181, 253, 0.4) 100%)',
            glow: 'linear-gradient(135deg, rgba(167, 139, 250, 0.5) 0%, rgba(196, 181, 253, 0.2) 100%)'
        }
    },
    spacing: {
        headerHeight: '64px',
        headerTop: '32px',
        headerPadding: '0 40px',
        contentWidth: '1200px',
        contentPadding: '40px',
        mainPaddingTop: '120px',
        sidebarWidth: '360px',
        sidebarSpacing: '48px',
        gap: {
            grid: '80px',
            articles: '48px',
            nav: '48px',
            meta: '20px',
            social: '20px'
        },
        padding: {
            card: '48px 56px',
            sidebar: '48px',
            content: '40px',
            nav: '20px 32px',
            meta: '12px 24px'
        },
        margin: {
            sectionTitle: '48px',
            articleTitle: '24px',
            articleMeta: '16px',
            articleDesc: '24px',
            sidebarSection: '48px',
            categoryItem: '16px'
        },
        sections: {
            aboutMarginBottom: '48px',
            categoriesMarginTop: '48px',
            articleFooterSpacing: '40px'
        },
        divider: {
            margin: '48px 0',
            opacity: '0.1'
        },
        base: {
            unit: '4px',
            scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100]
        },
        container: {
            maxWidth: '1200px',
            padding: {
                desktop: '40px',
                tablet: '32px',
                mobile: '24px'
            }
        },
        article: {
            spacing: {
                between: '48px',
                meta: '16px',
                title: '24px',
                description: '24px',
                footer: '32px'
            },
            padding: {
                desktop: '48px 56px',
                tablet: '40px 48px',
                mobile: '32px 40px'
            }
        },
        sidebar: {
            spacing: {
                section: '48px',
                item: '16px',
                title: '24px'
            }
        },
        presets: {
            compact: {
                card: '32px',
                container: '32px',
                section: '48px'
            },
            normal: {
                card: '48px',
                container: '48px',
                section: '64px'
            },
            relaxed: {
                card: '64px',
                container: '64px',
                section: '80px'
            }
        }
    },
    typography: {
        logo: {
            size: '32px',
            weight: '800',
            spacing: '-0.04em',
            gradient: 'var(--theme-gradients-text)'
        },
        nav: {
            size: '16px',
            spacing: '0.03em',
            weight: '600',
            transform: 'none'
        },
        title: {
            size: '40px',
            lineHeight: '1.2',
            weight: '800',
            spacing: '-0.03em',
            gradient: 'var(--theme-gradients-text)'
        },
        sectionTitle: {
            size: '28px',
            weight: '700',
            spacing: '-0.02em',
            marginBottom: '40px',
            gradient: 'var(--theme-gradients-text)'
        },
        meta: {
            size: '15px',
            spacing: '0.03em',
            weight: '500'
        },
        description: {
            size: '17px',
            lineHeight: '1.8',
            spacing: '0.02em',
            weight: '400'
        },
        footer: {
            size: '15px',
            spacing: '0.03em',
            weight: '400'
        },
        sidebar: {
            title: {
                size: '24px',
                spacing: '-0.02em',
                weight: '700',
                marginBottom: '32px',
                gradient: 'var(--theme-gradients-text)'
            },
            text: {
                size: '16px',
                lineHeight: '1.8',
                spacing: '0.02em',
                weight: '400'
            },
            category: {
                size: '16px',
                spacing: '0.02em',
                weight: '600'
            },
            count: {
                size: '14px',
                lineHeight: '1.4',
                weight: '700'
            },
            about: {
                title: {
                    size: '24px',
                    weight: '700',
                    color: 'var(--theme-text-primary)',
                    marginBottom: '24px'
                },
                description: {
                    size: '16px',
                    lineHeight: '1.8',
                    color: 'var(--theme-text-secondary)',
                    marginBottom: '24px'
                }
            },
            categories: {
                title: {
                    size: '24px',
                    weight: '700',
                    color: 'var(--theme-text-primary)',
                    marginBottom: '24px'
                },
                item: {
                    name: {
                        size: '16px',
                        color: 'var(--theme-text-secondary)',
                        hover: {
                            color: 'var(--theme-text-primary)'
                        }
                    },
                    count: {
                        size: '14px',
                        color: '#fff',
                        background: 'var(--theme-primary)'
                    }
                }
            },
            social: {
                link: {
                    size: '14px',
                    color: 'var(--theme-primary)',
                    hover: {
                        opacity: '0.8'
                    }
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
                color: '#1A4731',
                textShadow: '0 1px 2px rgba(47, 133, 90, 0.08)',
                transition: 'all 0.3s ease',
                hover: {
                    color: '#2F855A',
                    transform: 'translateY(-2px)',
                    textShadow: '0 2px 4px rgba(47, 133, 90, 0.12)'
                }
            },
            meta: {
                size: '15px',
                spacing: '0.03em',
                weight: '500',
                color: '#2F855A',
                textShadow: '0 1px 2px rgba(47, 133, 90, 0.08)'
            },
            description: {
                size: '17px',
                lineHeight: '1.8',
                spacing: '0.02em',
                weight: '400',
                color: '#276749',
                textShadow: '0 1px 2px rgba(47, 133, 90, 0.08)'
            }
        },
        base: {
            family: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
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
        button: '0 4px 12px rgba(167, 139, 250, 0.3)',
        focus: '0 0 0 4px rgba(167, 139, 250, 0.35)'
    },
    effects: {
        hover: {
            transform: {
                subtle: 'translateY(-3px)',
                medium: 'translateY(-6px)',
                large: 'translateY(-8px)'
            },
            shadow: {
                subtle: '0 8px 24px rgba(0,0,0,0.2)',
                medium: '0 16px 32px rgba(0,0,0,0.25)',
                large: '0 24px 48px rgba(0,0,0,0.3)'
            },
            scale: {
                subtle: 'scale(1.03)',
                medium: 'scale(1.05)',
                large: 'scale(1.07)'
            },
            glow: {
                subtle: '0 0 30px rgba(167,139,250,0.3)',
                medium: '0 0 40px rgba(167,139,250,0.4)',
                large: '0 0 50px rgba(167,139,250,0.5)'
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
                    backdropFilter: 'blur(24px)',
                    border: '1px solid var(--theme-card-border)',
                    shadow: 'var(--theme-shadow-card)',
                    hover: {
                        transform: 'translateY(-6px)',
                        shadow: 'var(--theme-shadow-hover)',
                        glow: 'var(--theme-card-glow)'
                    }
                },
                gradient: {
                    background: 'var(--theme-gradients-card)',
                    backdropFilter: 'blur(24px)',
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
                    color: '#FFFFFF',
                    shadow: 'var(--theme-shadow-button)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    hover: {
                        transform: 'translateY(-3px)',
                        shadow: '0 8px 16px rgba(167, 139, 250, 0.4)',
                        glow: '0 0 20px rgba(167, 139, 250, 0.3)'
                    }
                },
                glass: {
                    background: 'var(--theme-variants-glass)',
                    backdropFilter: 'blur(24px)',
                    color: '#F8FAFC',
                    border: '1px solid var(--theme-card-border)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    hover: {
                        transform: 'translateY(-3px)',
                        shadow: 'var(--theme-shadow-hover)',
                        glow: '0 0 20px rgba(167, 139, 250, 0.2)'
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

// 方案5：科技感风格
export const theme5 = {
    name: '科技',
    colors: {
        primary: '#2F855A',  // 深绿色主色调
        background: '#8bc594', // 基础背景色
        text: {
            primary: '#1A4731',    // 深绿色主文本
            secondary: '#276749',  // 中深绿色次要文本
            meta: '#2F855A',      // 绿色meta文本
            code: '#234E52',      // 深青色代码文本
            accent: '#38A169'     // 鲜绿色强调色
        },
        nav: {
            inactive: 'rgba(44, 82, 60, 0.8)',
            hover: 'rgba(47, 133, 90, 0.9)',
            active: '#2F855A',
            background: 'rgba(255, 255, 255, 0.95)', // 更透明的导航背景
            blur: '20px'  // 减小模糊半径
        },
        card: {
            background: '#ffffffd1',   // 修改为半透明白色
            hover: 'rgba(255, 255, 255, 0.95)',
            border: 'rgba(47, 133, 90, 0.1)',        // 更淡的边框
            glow: '0 0 30px rgba(47, 133, 90, 0.08)'  // 更柔和的光晕
        },
        divider: 'rgba(47, 133, 90, 0.08)',  // 更淡的分割线
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
                image: `
                    linear-gradient(180deg, #8bc594 0%, #a3d4ab 100%),
                    url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.pattern{fill:%239ed3a7;fill-opacity:0.8}%3C/style%3E%3Crect width='40' height='40' fill='none'/%3E%3Cpath class='pattern' d='M0 0h40v2H0zM0 10h40v2H0zM0 20h40v2H0zM0 30h40v2H0zM0 0h2v40H0zM10 0h2v40h-2zM20 0h2v40h-2zM30 0h2v40h-2z'/%3E%3C/svg%3E")
                `,
                repeat: 'repeat',
                position: 'center',
                size: '40px'
            },
            card: 'none',  // 移除卡片渐变，使用纯色背景
            text: 'linear-gradient(90deg, #1A4731 0%, #276749 100%)',
            border: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
            glow: 'linear-gradient(135deg, rgba(47, 133, 90, 0.25) 0%, rgba(56, 161, 105, 0.1) 100%)'
        }
    },
    shadows: {
        card: '0 4px 20px rgba(26, 71, 49, 0.04), 0 8px 30px rgba(26, 71, 49, 0.02)', // 双层阴影
        hover: '0 10px 30px rgba(26, 71, 49, 0.06), 0 15px 40px rgba(26, 71, 49, 0.03)',
        dropdown: '0 4px 12px rgba(26, 71, 49, 0.04)',
        button: '0 2px 8px rgba(47, 133, 90, 0.15)',
        focus: '0 0 0 3px rgba(47, 133, 90, 0.15)'
    },
    borderRadius: {
        card: '20px',      // 增大圆角
        button: '12px',
        tag: '8px',
        image: '16px',
        input: '10px'
    },
    spacing: { ...theme4.spacing },
    typography: {
        ...theme4.typography,
        sidebar: {
            ...theme4.typography.sidebar,
            about: {
                title: {
                    ...theme4.typography.sidebar.about.title,
                    size: '24px',
                    weight: '700',
                    color: '#1A4731',
                    marginBottom: '24px',
                    textShadow: '0 1px 2px rgba(47, 133, 90, 0.05)' // 添加轻微文字阴影
                },
                description: {
                    ...theme4.typography.sidebar.about.description,
                    size: '16px',
                    lineHeight: '1.8',
                    color: '#276749',
                    marginBottom: '24px',
                    letterSpacing: '0.01em' // 增加字间距
                }
            },
            categories: {
                title: {
                    ...theme4.typography.sidebar.categories.title,
                    background: 'linear-gradient(90deg, #1A4731 0%, #276749 100%)', // 添加渐变色
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '24px'
                },
                item: {
                    name: {
                        ...theme4.typography.sidebar.categories.item.name,
                        color: '#276749',
                        transition: 'all 0.3s ease',
                        hover: {
                            color: '#2F855A',
                            transform: 'translateX(4px)' // 添加移动效果
                        }
                    }
                }
            }
        },
        article: {
            ...theme4.typography.article,
            title: {
                ...theme4.typography.article.title,
                background: 'linear-gradient(90deg, #1A4731 0%, #276749 100%)', // 标题渐变
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                weight: '700',
                letterSpacing: '-0.02em',
                hover: {
                    ...theme4.typography.article.title.hover,
                    transform: 'translateY(-2px)',
                    filter: 'brightness(1.1)'
                }
            },
            meta: {
                ...theme4.typography.article.meta,
                color: '#2F855A',
                letterSpacing: '0.02em'
            },
            description: {
                ...theme4.typography.article.description,
                color: '#276749',
                lineHeight: '1.85',
                letterSpacing: '0.01em'
            }
        }
    },
    effects: {
        ...theme4.effects,
        hover: {
            ...theme4.effects.hover,
            transform: {
                subtle: 'translateY(-2px)',
                medium: 'translateY(-4px) scale(1.01)',
                large: 'translateY(-6px) scale(1.02)'
            },
            glow: {
                subtle: '0 0 20px rgba(47, 133, 90, 0.1)',
                medium: '0 0 30px rgba(47, 133, 90, 0.15)',
                large: '0 0 40px rgba(47, 133, 90, 0.2)'
            }
        },
        focus: {
            ring: {
                width: '3px',
                color: 'rgba(47, 133, 90, 0.2)',
                offset: '2px'
            }
        }
    },
    components: {
        ...theme4.components,
        button: {
            ...theme4.components.button,
            variants: {
                solid: {
                    ...theme4.components.button.variants.solid,
                    background: 'linear-gradient(135deg, #276749 0%, #2F855A 100%)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    hover: {
                        ...theme4.components.button.variants.solid.hover,
                        transform: 'translateY(-2px)',
                        shadow: '0 8px 20px rgba(47, 133, 90, 0.2)',
                        glow: '0 0 15px rgba(47, 133, 90, 0.15)'
                    }
                },
                glass: {
                    ...theme4.components.button.variants.glass,
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#1A4731',
                    hover: {
                        ...theme4.components.button.variants.glass.hover,
                        background: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                        glow: '0 0 15px rgba(47, 133, 90, 0.1)'
                    }
                }
            }
        },
        card: {
            ...theme4.components.card,
            variants: {
                elevated: {
                    ...theme4.components.card.variants.elevated,
                    background: '#ffffffd1',  // 修改为半透明白色
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 20px rgba(26, 71, 49, 0.04), 0 8px 30px rgba(26, 71, 49, 0.02)',
                    hover: {
                        transform: 'translateY(-4px) scale(1.01)',
                        boxShadow: '0 10px 30px rgba(26, 71, 49, 0.06), 0 15px 40px rgba(26, 71, 49, 0.03)'
                    }
                }
            }
        }
    }
}

// 方案6：科技感风格（基于主题5的变体）
export const theme6 = {
    name: '清雅',
    colors: {
        primary: '#2F855A',
        background: '#8bc594',  // 保持背景色不变
        text: {
            primary: '#1A4731',
            secondary: '#276749',
            meta: '#2F855A',
            code: '#234E52',
            accent: '#38A169'
        },
        nav: {
            inactive: 'rgba(44, 82, 60, 0.6)',  // 降低不活跃状态的透明度
            hover: 'rgba(47, 133, 90, 0.8)',
            active: '#2F855A',
            background: 'rgba(255, 255, 255, 0.85)',  // 降低导航栏透明度
            blur: '12px'  // 减小模糊半径
        },
        card: {
            background: 'rgba(255, 255, 255, 0.92)',  // 增加卡片透明度
            hover: 'rgba(255, 255, 255, 0.98)',
            border: 'rgba(255, 255, 255, 0.3)',  // 更柔和的边框
            glow: '0 0 20px rgba(255, 255, 255, 0.15)'  // 更柔和的光晕
        },
        divider: 'rgba(255, 255, 255, 0.15)',  // 更柔和的分割线
        states: {
            hover: {
                primary: 'rgba(47, 133, 90, 0.85)',
                text: '#1A4731',
                background: 'rgba(255, 255, 255, 0.95)'
            },
            active: {
                primary: '#2F855A',
                text: '#1A4731',
                background: '#ffffff'
            },
            disabled: {
                primary: 'rgba(47, 133, 90, 0.4)',
                text: 'rgba(26, 71, 49, 0.4)',
                background: 'rgba(255, 255, 255, 0.4)'
            }
        },
        gradients: {
            primary: 'linear-gradient(135deg, #276749 0%, #2F855A 100%)',  // 简化渐变
            background: {
                color: '#8bc594',
                image: `
                    linear-gradient(180deg, #8bc594 0%, #a3d4ab 100%),
                    url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.pattern{fill:%239ed3a7;fill-opacity:0.6}%3C/style%3E%3Crect width='40' height='40' fill='none'/%3E%3Cpath class='pattern' d='M0 0h40v1H0zM0 10h40v1H0zM0 20h40v1H0zM0 30h40v1H0zM0 0h1v40H0zM10 0h1v40h-1zM20 0h1v40h-1zM30 0h1v40h-1z'/%3E%3C/svg%3E")
                `,
                repeat: 'repeat',
                position: 'center',
                size: '40px'
            },
            card: 'none',  // 移除卡片渐变
            text: 'none',  // 移除文字渐变
            border: 'none'  // 移除边框渐变
        }
    },
    shadows: {
        card: '0 2px 10px rgba(26, 71, 49, 0.03)',  // 更轻柔的阴影
        hover: '0 5px 15px rgba(26, 71, 49, 0.05)',
        dropdown: '0 2px 8px rgba(26, 71, 49, 0.03)',
        button: '0 1px 4px rgba(47, 133, 90, 0.1)',
        focus: '0 0 0 2px rgba(47, 133, 90, 0.1)'
    },
    borderRadius: {
        card: '12px',      // 减小圆角
        button: '8px',
        tag: '6px',
        image: '10px',
        input: '8px'
    },
    spacing: {
        ...theme5.spacing,
        padding: {
            card: '24px 28px',    // 减小内边距
            sidebar: '24px',
            content: '20px',
            nav: '12px 20px',
            meta: '6px 12px'
        },
        gap: {
            grid: '40px',         // 减小间距
            articles: '24px',
            nav: '32px',
            meta: '12px',
            social: '16px'
        }
    },
    typography: {
        ...theme5.typography,
        logo: {
            size: '24px',         // 减小logo大小
            weight: '600',
            spacing: '-0.02em'
        },
        nav: {
            size: '14px',         // 减小导航字体
            spacing: '0.02em',
            weight: '500'
        },
        title: {
            size: '28px',         // 减小标题大小
            lineHeight: '1.4',
            weight: '600',
            spacing: '-0.01em'
        },
        description: {
            size: '15px',         // 减小描述文字
            lineHeight: '1.6',
            spacing: '0.01em'
        }
    },
    effects: {
        hover: {
            transform: {
                subtle: 'translateY(-1px)',    // 减小悬浮效果
                medium: 'translateY(-2px)',
                large: 'translateY(-3px)'
            },
            shadow: {
                subtle: '0 2px 8px rgba(26, 71, 49, 0.03)',
                medium: '0 4px 12px rgba(26, 71, 49, 0.05)',
                large: '0 6px 16px rgba(26, 71, 49, 0.07)'
            }
        }
    },
    components: {
        card: {
            variants: {
                elevated: {
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    hover: {
                        transform: 'translateY(-2px)',
                        background: 'rgba(255, 255, 255, 0.98)'
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
                    hover: {
                        transform: 'translateY(-1px)',
                        background: '#276749'
                    }
                },
                ghost: {
                    background: 'transparent',
                    color: '#2F855A',
                    border: '1px solid currentColor',
                    hover: {
                        background: 'rgba(47, 133, 90, 0.05)'
                    }
                }
            }
        }
    }
}

// 方案7：未来科技风格
export const theme7 = {
    name: '未来',
    colors: {
        primary: '#2F855A',
        background: '#8bc594',  // 保持背景色不变
        text: {
            primary: '#1A4731',
            secondary: '#276749',
            meta: '#2F855A',
            code: '#234E52',
            accent: '#38A169'
        },
        nav: {
            inactive: 'rgba(44, 82, 60, 0.5)',
            hover: 'rgba(47, 133, 90, 0.7)',
            active: '#2F855A',
            background: 'rgba(255, 255, 255, 0.7)',
            blur: '16px'
        },
        card: {
            background: 'rgba(255, 255, 255, 0.85)',
            hover: 'rgba(255, 255, 255, 0.95)',
            border: 'rgba(255, 255, 255, 0.2)',
            glow: '0 0 30px rgba(255, 255, 255, 0.1)'
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        states: {
            hover: {
                primary: 'rgba(47, 133, 90, 0.8)',
                text: '#1A4731',
                background: 'rgba(255, 255, 255, 0.9)'
            },
            active: {
                primary: '#2F855A',
                text: '#1A4731',
                background: '#ffffff'
            },
            disabled: {
                primary: 'rgba(47, 133, 90, 0.3)',
                text: 'rgba(26, 71, 49, 0.3)',
                background: 'rgba(255, 255, 255, 0.3)'
            }
        },
        gradients: {
            primary: 'linear-gradient(135deg, #276749 0%, #2F855A 100%)',
            background: {
                color: '#8bc594',
                image: `
                    linear-gradient(180deg, #8bc594 0%, #a3d4ab 100%),
                    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.pattern{fill:%239ed3a7;fill-opacity:0.4}%3C/style%3E%3Crect width='60' height='60' fill='none'/%3E%3Cpath class='pattern' d='M0 0h60v1H0zM0 20h60v1H0zM0 40h60v1H0zM0 0h1v60H0zM20 0h1v60h-1zM40 0h1v60h-1z'/%3E%3C/svg%3E")
                `,
                repeat: 'repeat',
                position: 'center',
                size: '60px'
            },
            card: 'none'
        }
    },
    shadows: {
        card: '0 4px 20px rgba(26, 71, 49, 0.02)',
        hover: '0 8px 30px rgba(26, 71, 49, 0.04)',
        dropdown: '0 4px 16px rgba(26, 71, 49, 0.02)',
        button: '0 2px 8px rgba(47, 133, 90, 0.08)',
        focus: '0 0 0 2px rgba(47, 133, 90, 0.08)'
    },
    borderRadius: {
        card: '16px',
        button: '10px',
        tag: '8px',
        image: '12px',
        input: '10px'
    },
    spacing: {
        headerHeight: '60px',
        headerTop: '28px',
        headerPadding: '0 36px',
        contentWidth: '1140px',
        contentPadding: '36px',
        mainPaddingTop: '110px',
        sidebarWidth: '320px',
        sidebarSpacing: '40px',
        gap: {
            grid: '48px',
            articles: '32px',
            nav: '40px',
            meta: '16px',
            social: '20px'
        },
        padding: {
            card: '28px 32px',
            sidebar: '28px',
            content: '24px',
            nav: '14px 24px',
            meta: '8px 16px'
        },
        margin: {
            sectionTitle: '36px',
            articleTitle: '16px',
            articleMeta: '12px',
            articleDesc: '16px',
            sidebarSection: '32px',
            categoryItem: '12px'
        }
    },
    typography: {
        logo: {
            size: '26px',
            weight: '600',
            spacing: '-0.02em',
            height: '32px'
        },
        nav: {
            size: '15px',
            spacing: '0.02em',
            weight: '500',
            height: '20px'
        },
        title: {
            size: '32px',
            lineHeight: '1.3',
            weight: '600',
            spacing: '-0.01em',
            height: '42px'
        },
        description: {
            size: '16px',
            lineHeight: '1.6',
            spacing: '0.01em',
            height: '26px'
        },
        article: {
            title: {
                size: '24px',
                lineHeight: '1.4',
                weight: '600',
                spacing: '-0.01em'
            },
            meta: {
                size: '14px',
                spacing: '0.02em',
                weight: '500'
            },
            description: {
                size: '15px',
                lineHeight: '1.6',
                spacing: '0.01em'
            }
        }
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

// 导出所有主题
export const themes = {
    theme1,
    theme2,
    theme3,
    theme4,
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